import { Injectable } from '@angular/core';
import { Materia } from '../models/materia';
import { Corte } from '../models/corte';
import { Tarea } from '../models/tarea';
import { Horario } from '../models/horario';
import { Semestre } from '../models/semestre';
import { RegistroEstudio } from '../models/registroEstudio'


@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private materias: Materia[] = [];

  // --- Materias ---
  agregarMateria(materia: Materia) {
    this.materias.push(materia);
  }

  setMaterias(materias: Materia[]) {
    this.materias = materias;
  }


  //no se ha testeado aún!!
  validarDuplicado(nombre: string): boolean {
    return this.materias.some(m => m.nombre === nombre);
  }

  agregarRegistro(idMateria: number, registro: RegistroEstudio) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (materia) {
      materia.agregarRegistro(registro);
    }
  }

  // --- Cortes dentro de materia ---

  editarCorte(idMateria: number, idCorte: number, cambios: Partial<Corte>) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    console.log("Materia encontrada:", materia);

    const corteEditado = materia?.cortes.find(c => c.idCorte === idCorte);
    console.log("Corte antes de cambios:", corteEditado);

    if (cambios.porcentaje !== undefined) {
      corteEditado!.porcentaje = cambios.porcentaje;
      console.log("Nuevo porcentaje asignado:", corteEditado!.porcentaje);
    }

    corteEditado!.calcularDefinitiva();
    console.log("Definitiva recalculada:", corteEditado!.notaDefinitiva);
  }


  // Validación final: suma debe ser 100
  finalizarEdicion(idMateria: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (!materia) {
      console.log("No se encontró la materia con id:", idMateria);
      return;
    }

    console.log("Validando porcentajes de la materia:", materia.nombre);
    materia.cortes.forEach(c => {
      console.log(`Corte ${c.idCorte} - ${c.nombre}: ${c.porcentaje}% (tipo: ${typeof c.porcentaje})`);
    });

    const total = materia.cortes.reduce((acc, c) => acc + Number(c.porcentaje), 0);
    console.log("Suma total de porcentajes:", total);

    if (total !== 100) {
      throw new Error(`Los porcentajes deben sumar 100%. Actualmente suman ${total}%.`);
    }
  }


  // --- Tareas dentro de materia ---
  agregarTarea(idMateria: number, nombre: string, fecha: Date, tipoRecordatorio: string) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.agregarTarea(nombre, fecha, tipoRecordatorio);
  }


  editarTarea(materiaId: number, tareaId: number, cambios: Partial<Tarea>) {
    const materia = this.materias.find(m => m.idMateria === materiaId);
    if (materia) {
      const tarea = materia.tareas.find(t => t.idTarea === tareaId);
      if (tarea) {
        if (cambios.nombre !== undefined) tarea.nombre = cambios.nombre;
        if (cambios.fecha !== undefined) tarea.fecha = cambios.fecha;
        if (cambios.tipoRecordatorio !== undefined) tarea.tipoRecordatorio = cambios.tipoRecordatorio;
        if (cambios.estado !== undefined) tarea.estado = cambios.estado;
      }
    }
  }

  eliminarTarea(materiaId: number, tareaId: number) {
    const materia = this.materias.find(m => m.idMateria === materiaId);
    if (materia) {
      materia.tareas = materia.tareas.filter(t => t.idTarea !== tareaId);
    }
  }

  obtenerTareas(idMateria: number): Tarea[] {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (!materia) {
      return [];
    }
    return materia.tareas;
  }

  //--Registros dentro de materia
  // Obtener horas acumuladas de una materia
  obtenerHorasAcumuladas(materia: Materia): number {
    return materia.calcularHorasAcumuladas();
  }

  // Obtener historial semanal de una materia
  obtenerHistorialSemanal(materia: Materia, semestre: Semestre): number[] {
    return materia.calcularHistorialSemanal(semestre);
  }

  // Cumplimiento semanal de una materia
  obtenerCumplimientoSemanal(materia: Materia, semestre: Semestre): number {
    materia.calcularHorasTrabajo(semestre); // 🔑 asegura que los valores estén listos

    const horasEsperadas = materia.horasIndependientesPorSemana ?? 0;
    const semanaActual = semestre.calcularSemanaActual(new Date());

    const registrosSemana = materia.registros.filter(
      r => semestre.calcularSemanaActual(r.fecha) === semanaActual
      
    );

    const horasAcumuladasSemana = registrosSemana.reduce(
      (acc, r) => acc + r.duracionMinutos,
      0
    ) / 60;
    const porcentaje = horasEsperadas > 0 ? (horasAcumuladasSemana / horasEsperadas) * 100 : 0;

    return porcentaje;
  }

  obtenerCumplimientoSemanalPorSemana(materia: Materia, semestre: Semestre, semana: number): number {
    materia.calcularHorasTrabajo(semestre); // asegura que los valores estén listos

    const horasEsperadas = materia.horasIndependientesPorSemana ?? 0;

    // Filtrar registros de la semana indicada
    const registrosSemana = materia.registros.filter(
      r => semestre.calcularSemanaActual(r.fecha) === semana
    );

    const horasAcumuladasSemana = registrosSemana.reduce(
      (acc, r) => acc + r.duracionMinutos,
      0
    ) / 60;

    return horasEsperadas > 0 ? (horasAcumuladasSemana / horasEsperadas) * 100 : 0;
  }



  // --- Horarios (bloques de 1 hora) ---
  addHorario(idMateria: number, dia: number, horaInicio: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (!materia) return { success: false, message: 'Materia no encontrada' };
    return materia.agregarBloqueHorario(dia, horaInicio, undefined);
  }

  updateHorario(idMateria: number, horarioId: number, dia: number, horaInicio: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (!materia) return { success: false, message: 'Materia no encontrada' };
    return materia.editarBloqueHorario(horarioId, dia, horaInicio, undefined);
  }

  deleteHorario(idMateria: number, horarioId: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (!materia) return false;
    return materia.eliminarBloqueHorario(horarioId);
  }

  obtenerHorarios(idMateria: number): Horario[] {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (!materia) return [];
    return materia.obtenerHorarios();
  }

  replaceHorarios(idMateria: number, horarios: Horario[]) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (!materia) return { success: false, message: 'Materia no encontrada' };
    materia.horarios = [];
    horarios.forEach(h => materia.agregarBloqueHorario(h.dia, h.horaInicio));
    return { success: true };
  }



}
