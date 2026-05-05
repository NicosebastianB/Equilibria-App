import { Injectable } from '@angular/core';
import { Materia } from '../models/materia';
import { Corte } from '../models/corte';
import { Actividad } from '../models/actividad';
import { Calificable } from '../models/calificable';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  //--- Gestión de actividades dentro de un corte ---
  agregarActividad(corte: Corte, actividad: Actividad) {
    corte.actividades.push(actividad);
    corte.calcularDefinitiva(); // recalcular corte
  }

  editarActividad(corte: Corte, idActividad: number, cambios: Partial<Actividad>) {
    const actividad = corte.actividades.find(a => a.idActividad === idActividad);
    if (actividad) {
      if (cambios.nombre !== undefined) actividad.nombre = cambios.nombre;
      if (cambios.porcentaje !== undefined) actividad.porcentaje = cambios.porcentaje;
      actividad.calcularDefinitiva();
      corte.calcularDefinitiva();
    }
  }

  eliminarActividad(corte: Corte, idActividad: number) {
    corte.actividades = corte.actividades.filter(a => a.idActividad !== idActividad);
    corte.calcularDefinitiva();
  }

  obtenerActividades(corte: Corte): Actividad[] {
    return corte.actividades;
  }

  //--- Gestión de calificables dentro de actividad ---
  agregarCalificable(actividad: Actividad, calificable: Calificable) {
    actividad.calificables.push(calificable);
    actividad.calcularDefinitiva();
  }

  editarCalificable(actividad: Actividad, calificableId: number, cambios: Partial<Calificable>) {
    const calificable = actividad.calificables.find(c => c.idCalificable === calificableId);
    if (calificable) {
      if (cambios.nombre !== undefined) calificable.nombre = cambios.nombre;
      if (cambios.fecha !== undefined) calificable.fecha = cambios.fecha;
      if (cambios.tipoRecordatorio !== undefined) calificable.tipoRecordatorio = cambios.tipoRecordatorio;
      if (cambios.nota !== undefined) calificable.nota = cambios.nota;
      actividad.calcularDefinitiva();
    }
  }

  eliminarCalificable(actividad: Actividad, idCalificable: number) {
    actividad.calificables = actividad.calificables.filter(c => c.idCalificable !== idCalificable);
    actividad.calcularDefinitiva();
  }

  obtenerCalificables(actividad: Actividad): Calificable[] {
    return actividad.calificables;
  }
}
