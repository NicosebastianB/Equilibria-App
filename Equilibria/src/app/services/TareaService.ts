import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tareas: Tarea[] = [];

  agregarTarea(tarea: Tarea) {
    this.tareas.push(tarea);
  }

  editarTarea(idTarea: number, nuevaTarea: Tarea) {
    const index = this.tareas.findIndex(t => t.idTarea === idTarea);
    if (index !== -1) {
      this.tareas[index] = nuevaTarea;
    }
  }

  eliminarTarea(idTarea: number) {
    this.tareas = this.tareas.filter(t => t.idTarea !== idTarea);
  }

  obtenerTareas(): Tarea[] {
    return this.tareas;
  }

  marcarCompletada(idTarea: number) {
    const tarea = this.tareas.find(t => t.idTarea === idTarea);
    if (tarea) {
      tarea.completado();
    }
  }

  marcarPendiente(idTarea: number) {
    const tarea = this.tareas.find(t => t.idTarea === idTarea);
    if (tarea) {
      tarea.pendiente();
    }
  }
}
