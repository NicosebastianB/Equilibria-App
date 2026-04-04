import { Corte } from './corte';
import { Tarea } from './tarea';
import { Semestre } from './semestre';
import {RegistroEstudio} from './registroEstudio';

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

  constructor(
    public idMateria: number,
    public nombre: string,
    public color: string,
    public creditos: number,
    public profesor: string,
    public salon: string,
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
