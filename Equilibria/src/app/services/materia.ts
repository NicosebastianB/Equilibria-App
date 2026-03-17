import { Injectable } from '@angular/core';
import { Materia } from '../models/materia';
import { Corte } from '../models/corte';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private materias: Materia[] = [];

  // --- Materias ---
  agregarMateria(materia: Materia) {
    this.materias.push(materia);
  }

  editarMateria(idMateria: number, nuevaMateria: Materia) {
    const index = this.materias.findIndex(m => m.idMateria === idMateria);
    if (index !== -1) {
      this.materias[index] = nuevaMateria;
    }
  }

  eliminarMateria(idMateria: number) {
    this.materias = this.materias.filter(m => m.idMateria !== idMateria);
  }

  obtenerMaterias(): Materia[] {
    return this.materias;
  }

  validarDuplicado(nombre: string): boolean {
    return this.materias.some(m => m.nombre === nombre);
  }

  // --- Cortes dentro de materia ---
  agregarCorte(idMateria: number, corte: Corte) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.agregarCorte(corte);
  }

  editarCorte(idMateria: number, idCorte: number, nuevoCorte: Corte) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.editarCorte(idCorte, nuevoCorte);
  }

  eliminarCorte(idMateria: number, idCorte: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.eliminarCorte(idCorte);
  }

  calcularDefinitivaMateria(idMateria: number): number {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    return materia ? materia.calcularDefinitiva() : 0;
  }

  // --- Tareas dentro de materia ---
  agregarTarea(idMateria: number, tarea: Tarea) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.agregarTarea(tarea);
  }

  editarTarea(idMateria: number, idTarea: number, nuevaTarea: Tarea) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.editarTarea(idTarea, nuevaTarea);
  }

  eliminarTarea(idMateria: number, idTarea: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.eliminarTarea(idTarea);
  }

  marcarTareaCompletada(idMateria: number, idTarea: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.marcarTareaCompletada(idTarea);
  }

  marcarTareaPendiente(idMateria: number, idTarea: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.marcarTareaPendiente(idTarea);
  }
}
