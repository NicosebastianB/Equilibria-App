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

  agregarCalificable(idActividad: number, calificable: Calificable) {
    const actividad = this.actividades.find(a => a.idActividad === idActividad);
    actividad?.agregarCalificable(calificable);
  }

  calcularDefinitivaActividad(idActividad: number): number {
    const actividad = this.actividades.find(a => a.idActividad === idActividad);
    return actividad ? actividad.calcularDefinitiva() : 0;
  }
}
