import { Corte } from './corte';
import { Tarea } from './tarea';
import { Semestre } from './semestre';
import {RegistroEstudio} from './registroEstudio';
import {Horario} from './horario';

export class Materia {
  public definitiva?: number;
  public notaFaltante?: number;
  public cortes: Corte[];
  public tareas: Tarea[] = [];
  public horasTotales: number = 0;
  public horasPresenciales: number = 0;
  public horasIndependientes: number = 0;
  public horasIndependientesPorSemana: number = 0;
  public registros: RegistroEstudio[] = [];
  public horarios: Horario[] = [];
  private nextHorarioId: number = 1;

  constructor(
    public idMateria: number,
    public nombre: string,
    public color: string,
    public creditos: number,
    public profesor: string,
    // salon movido al modelo Horario (opcional por bloque)
    public horasClaseSemanal: number,
    public semanas?: number, // opcional
    public finalizado: boolean = false
  ) {
    // Inicializar cortes dentro del constructor
    this.cortes = [
      new Corte(idMateria, 1, 'Corte 1', 30),
      new Corte(idMateria, 2, 'Corte 2', 30),
      new Corte(idMateria, 3, 'Corte 3', 40)
    ];
  }

  // -- Horarios (bloques de 1 hora, dias 1=Lunes .. 6=Sábado)

  // Agrega un bloque horario de 1 hora. Devuelve objeto con resultado y mensaje.
  agregarBloqueHorario(dia: number, horaInicio: number, salon?: string): { success: boolean; message?: string; horario?: Horario } {
    // Validaciones básicas
    if (dia < 1 || dia > 6) {
      return { success: false, message: 'El día debe estar entre 1 (Lunes) y 6 (Sábado).' };
    }

    if (horaInicio < 0 || horaInicio > 23) {
      return { success: false, message: 'La hora de inicio debe estar entre 0 y 23.' };
    }

    // No permitir duplicados exactos
    const existente = this.horarios.find(h => h.dia === dia && h.horaInicio === horaInicio);
    if (existente) {
      return { success: false, message: 'Ya existe un bloque en ese día y hora.' };
    }

    // Validar contra horas por semana (usar horasClaseSemanal como límite de bloques semanales)
    const bloquesActuales = this.horarios.length;
    if (this.horasClaseSemanal > 0 && bloquesActuales + 1 > this.horasClaseSemanal) {
      return { success: false, message: 'Excede el número de horas presenciales por semana.' };
    }

    const nuevo = new Horario(this.nextHorarioId++, this.idMateria, dia, horaInicio, 1, salon);
    this.horarios.push(nuevo);
    return { success: true, horario: nuevo };
  }

  editarBloqueHorario(id: number, dia: number, horaInicio: number, salon?: string): { success: boolean; message?: string; horario?: Horario } {
    const idx = this.horarios.findIndex(h => h.id === id);
    if (idx === -1) {
      return { success: false, message: 'Bloque no encontrado.' };
    }

    if (dia < 1 || dia > 6) {
      return { success: false, message: 'El día debe estar entre 1 (Lunes) y 6 (Sábado).' };
    }
    if (horaInicio < 0 || horaInicio > 23) {
      return { success: false, message: 'La hora de inicio debe estar entre 0 y 23.' };
    }

    // Verificar que no se genere conflicto con otro bloque
    const conflicto = this.horarios.find(h => h.id !== id && h.dia === dia && h.horaInicio === horaInicio);
    if (conflicto) {
      return { success: false, message: 'Otro bloque ya ocupa ese día y hora.' };
    }

    const horario = this.horarios[idx];
    horario.dia = dia;
    horario.horaInicio = horaInicio;
    if (salon !== undefined) horario.salon = salon;
    return { success: true, horario };
  }

  eliminarBloqueHorario(id: number): boolean {
    const idx = this.horarios.findIndex(h => h.id === id);
    if (idx === -1) return false;
    this.horarios.splice(idx, 1);
    return true;
  }

  obtenerHorarios(): Horario[] {
    return this.horarios.slice().sort((a, b) => (a.dia - b.dia) || (a.horaInicio - b.horaInicio));
  }

  obtenerHorariosPorDia(dia: number): Horario[] {
    return this.horarios.filter(h => h.dia === dia).sort((a, b) => a.horaInicio - b.horaInicio);
  }

  // Devuelve el rango de horario para un día (ej: inicio 7, fin 10 si hay bloques 7,8,9). Retorna null si no hay bloques.
  calcularRangoHorarioDia(dia: number): { inicio: number; fin: number } | null {
    const bloques = this.obtenerHorariosPorDia(dia);
    if (bloques.length === 0) return null;
    const inicio = Math.min(...bloques.map(b => b.horaInicio));
    const fin = Math.max(...bloques.map(b => b.horaInicio)) + 1; // fin es hora posterior al último bloque
    return { inicio, fin };
  }

  // Valida que el número de bloques semanales no exceda las horas de clase por semana
  validarBloquesConHorasClaseSemanal(): boolean {
    if (this.horasClaseSemanal <= 0) return true; // sin restricción definida
    return this.horarios.length <= this.horasClaseSemanal;
  }



  calcularHorasTrabajo(semestre?: Semestre) {
    const semanasActivas = this.semanas ?? semestre?.semanasTotales ?? 0;

    this.horasTotales = this.creditos * 48;
    this.horasPresenciales = this.horasClaseSemanal * semanasActivas;
    this.horasIndependientes = this.horasTotales - this.horasPresenciales;
    this.horasIndependientesPorSemana =
      semanasActivas > 0 ? this.horasIndependientes / semanasActivas : 0;
  }

  agregarTarea(tarea: Tarea) {
    this.tareas.push(tarea);
  }

  validarPorcentajes(): boolean {
    const total = this.cortes.reduce((acc, c) => acc + (c.porcentaje ?? 0), 0);
    return total === 100;
  }

  calcularDefinitiva(): number {
    if (this.cortes.length === 0) {
      this.definitiva = 0;
      return 0;
    }

    const total = this.cortes.reduce((acc, corte) => {
      const notaCorte = corte.calcularDefinitiva();
      return acc + (notaCorte * (corte.porcentaje / 100));
    }, 0);

    this.definitiva = total;
    return this.definitiva;
  }

  calcularNotaFaltante(notaMinima: number = 3.0): number {
    let notaActual = 0;
    let pesoRestante = 0;

    this.cortes.forEach(corte => {
      const notaCorte = corte.calcularDefinitiva();
      if (notaCorte > 0) {
        notaActual += notaCorte * (corte.porcentaje / 100);
      } else {
        pesoRestante += corte.porcentaje;
      }
    });

    if (pesoRestante === 0) {
      this.notaFaltante = 0; // ya no hay cortes restantes
      return 0;
    }

    const faltante = (notaMinima - notaActual) / (pesoRestante / 100);
    this.notaFaltante = Math.max(faltante, 0); // nunca negativo
    return this.notaFaltante;
  }

  validarCreditos(): boolean {
    return this.creditos > 0;
  }

  //--Registro de horas estudiadas

  agregarRegistro(registro: RegistroEstudio) {
    this.registros.push(registro);
  }

  // Horas acumuladas en toda la materia
  calcularHorasAcumuladas(): number {
    return this.registros.reduce((acc, r) => acc + r.duracionMinutos, 0) / 60;
  }

  // Horas acumuladas por semana
  calcularHistorialSemanal(semestre: Semestre): number[] {
    const semanas: number[] = Array(semestre.semanasTotales).fill(0);

    this.registros.forEach(r => {
      const semana = semestre.calcularSemanaActual(r.fecha);
      if (semana > 0 && semana <= semanas.length) {
        semanas[semana - 1] += r.duracionMinutos / 60;
      }
    });

    return semanas; // array con horas por semana
  }




}
