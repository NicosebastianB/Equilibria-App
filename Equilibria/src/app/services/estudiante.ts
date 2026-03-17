import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Materia } from '../models/materia';
import { Recordatorio } from '../models/recordatorio';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private estudiante: Estudiante | null = null;

  setEstudiante(est: Estudiante) {
    this.estudiante = est;
  }

  getEstudiante(): Estudiante | null {
    return this.estudiante;
  }

  // --- Materias ---
  agregarMateria(materia: Materia) {
    this.estudiante?.crearMateria(materia);
  }

  editarMateria(idMateria: number, nuevaMateria: Materia) {
    this.estudiante?.editarMateria(idMateria, nuevaMateria);
  }

  eliminarMateria(idMateria: number) {
    this.estudiante?.eliminarMateria(idMateria);
  }

  validarDuplicadoMateria(nombre: string): boolean {
    return this.estudiante?.duplicadoMaterias(nombre) ?? false;
  }

  calcularDefinitivaMateria(idMateria: number): number {
    return this.estudiante?.calcularDefinitivaMateria(idMateria) ?? 0;
  }

  // --- Recordatorios ---
  agregarRecordatorio(recordatorio: Recordatorio) {
    this.estudiante?.crearRecordatorio(recordatorio);
  }

  editarRecordatorio(idRecordatorio: number, nuevoRecordatorio: Recordatorio) {
    this.estudiante?.editarRecordatorio(idRecordatorio, nuevoRecordatorio);
  }

  eliminarRecordatorio(idRecordatorio: number) {
    this.estudiante?.eliminarRecordatorio(idRecordatorio);
  }

  validarDuplicadoRecordatorio(nombre: string): boolean {
    return this.estudiante?.duplicadoRecordatorios(nombre) ?? false;
  }

  activarTodosLosRecordatorios() {
    this.estudiante?.activarTodosLosRecordatorios();
  }

  desactivarTodosLosRecordatorios() {
    this.estudiante?.desactivarTodosLosRecordatorios();
  }
}
