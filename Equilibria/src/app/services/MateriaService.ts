import { Injectable } from '@angular/core';
import { Materia } from '../models/materia';
import { Corte } from '../models/corte';
import { Tarea } from '../models/tarea';
import { Horario } from '../models/horario';
import { Semestre } from '../models/semestre';


@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private materias: Materia[] = [];

  // --- Materias ---
  agregarMateria(materia: Materia) {
    this.materias.push(materia);
  }

  //no se ha testeado aún!!
  validarDuplicado(nombre: string): boolean {
    return this.materias.some(m => m.nombre === nombre);
  }

  // --- Cortes dentro de materia ---
  editarCorte(idMateria: number, idCorte: number, cambios: Partial<Corte>) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (!materia) return;

    const corteEditado = materia.cortes.find(c => c.idCorte === idCorte);
    if (!corteEditado) return;

    if (cambios.nombre !== undefined) {
      corteEditado.nombre = cambios.nombre;
    }

    if (cambios.porcentaje !== undefined) {
      corteEditado.fijo = true;
      corteEditado.porcentaje = cambios.porcentaje;

      const total = materia.cortes.reduce((acc, c) => acc + c.porcentaje, 0);
      const diferencia = 100 - total;

      const flexibles = materia.cortes.filter(c => !c.fijo);
      if (flexibles.length > 0) {
        const ajustePorCorte = diferencia / flexibles.length;
        flexibles.forEach(c => c.porcentaje += ajustePorCorte);
      }
    }
  }

  finalizarEdicion(idMateria: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (!materia) return;

    if (!materia.validarPorcentajes()) {
      throw new Error('Los porcentajes no suman 100 al finalizar edición.');
    }

    materia.cortes.forEach(c => c.fijo = false);
  }


  // --- Tareas dentro de materia ---
  agregarTarea(idMateria: number, tarea: Tarea) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.agregarTarea(tarea);
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
    const horasEsperadas = materia.horasIndependientesPorSemana ?? 0;
    const semanaActual = semestre.semanaActual;

    const horasAcumuladasSemana = materia.registros
      .filter(r => semestre.calcularSemanaActual(r.fecha) === semanaActual)
      .reduce((acc, r) => acc + r.duracionMinutos, 0) / 60;

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
