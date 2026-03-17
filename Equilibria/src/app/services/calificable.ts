import { Injectable } from '@angular/core';
import { Calificable } from '../models/calificable';

@Injectable({
  providedIn: 'root'
})
export class CalificableService {
  private calificables: Calificable[] = [];

  agregarCalificable(calificable: Calificable) {
    this.calificables.push(calificable);
  }

  editarCalificable(idCalificable: number, nuevoCalificable: Calificable) {
    const index = this.calificables.findIndex(c => c.idCalificable === idCalificable);
    if (index !== -1) {
      this.calificables[index] = nuevoCalificable;
    }
  }

  eliminarCalificable(idCalificable: number) {
    this.calificables = this.calificables.filter(c => c.idCalificable !== idCalificable);
  }

  obtenerCalificables(): Calificable[] {
    return this.calificables;
  }

  validarNotaCalificable(idCalificable: number): boolean {
    const calificable = this.calificables.find(c => c.idCalificable === idCalificable);
    return calificable ? calificable.validarNota() : false;
  }
}
