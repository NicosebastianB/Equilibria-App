import { Injectable } from '@angular/core';
import { Calificable } from '../models/calificable';

@Injectable({
  providedIn: 'root'
})
export class CalificableService {
  private calificables: Calificable[] = [];

  obtenerCalificables(): Calificable[] {
    return this.calificables;
  }

  validarNotaCalificable(idCalificable: number): boolean {
    const calificable = this.calificables.find(c => c.idCalificable === idCalificable);
    return calificable ? calificable.validarNota() : false;
  }
}
