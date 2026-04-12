import { Injectable } from '@angular/core';
import { Actividad } from '../models/actividad';
import { Calificable } from '../models/calificable';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private actividades: Actividad[] = [];

  agregarActividad(actividad: Actividad) {
    this.actividades.push(actividad);
  }

  editarActividad(idActividad: number, nuevaActividad: Actividad) {
    const index = this.actividades.findIndex(a => a.idActividad === idActividad);
    if (index !== -1) {
      this.actividades[index] = nuevaActividad;
    }
  }

  eliminarActividad(idActividad: number) {
    this.actividades = this.actividades.filter(a => a.idActividad !== idActividad);
  }

  obtenerActividades(): Actividad[] {
    return this.actividades;
  }


  //--- Gestión de calificables dentro de actividad ---
  agregarCalificable(idActividad: number, calificable: Calificable) {
    const actividad = this.actividades.find(a => a.idActividad === idActividad);
    actividad?.agregarCalificable(calificable);
  }

  editarCalificable(idActividad: number, calificableId: number, cambios: Partial<Calificable>) {
    const actividad = this.actividades.find(m => m.idActividad === idActividad);
    if (actividad) {
      const calificable = actividad.calificables.find(t => t.idCalificable === calificableId);
      if (calificable) {
        if (cambios.nombre !== undefined) calificable.nombre = cambios.nombre;
        if (cambios.fecha !== undefined) calificable.fecha = cambios.fecha;
        if (cambios.tipoRecordatorio !== undefined) calificable.tipoRecordatorio = cambios.tipoRecordatorio;
        if (cambios.nota !== undefined) calificable.nota = cambios.nota;
      }
    }
  }

  eliminarCalificable(idActividad: number, idCalificable: number) {
    const actividad = this.actividades.find(a => a.idActividad === idActividad);
    if (actividad) {
      actividad.calificables = actividad.calificables.filter(
        c => c.idCalificable !== idCalificable
      );
    }
  }


  obtenerCalificable(idActividad: number): Calificable[] {
  const actividad = this.actividades.find(m => m.idActividad === idActividad);
  if (!actividad) {
    return [];
  }
  return actividad.calificables;
}

  calcularDefinitivaActividad(idActividad: number): number {
    const actividad = this.actividades.find(a => a.idActividad === idActividad);
    return actividad ? actividad.calcularDefinitiva() : 0;
  }
}
