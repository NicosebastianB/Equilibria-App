import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Materia } from '../models/materia';
import { Recordatorio } from '../models/recordatorio';
import { Semestre } from '../models/semestre';

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

  // --- Semestre ---
  configurarSemestre(fechaInicio: Date, fechaFin: Date, vacaciones: { inicio: Date; fin: Date }[]): void {
    if (!this.estudiante) throw new Error('No hay estudiante creado');
    const semestre = new Semestre(1, 'Semestre actual', fechaInicio, fechaFin, vacaciones);
    semestre.calcularSemanasTotales();
    this.estudiante.configurarSemestre(semestre);
  }

  obtenerSemanaActual(fechaHoy: Date): number {
    if (!this.estudiante || !this.estudiante.semestre) throw new Error('No hay semestre configurado');
    return this.estudiante.obtenerSemanaActual(fechaHoy);
  }

  obtenerSemanasTotales(): number {
    if (!this.estudiante || !this.estudiante.semestre) throw new Error('No hay semestre configurado');
    return this.estudiante.obtenerSemanasTotales();
  }

  reconfigurarSemestre(fechaInicio: Date, fechaFin: Date, vacaciones: { inicio: Date; fin: Date }[]): void {
    if (!this.estudiante) throw new Error('No hay estudiante creado');
    const nuevoSemestre = new Semestre(1, 'Semestre actualizado', fechaInicio, fechaFin, vacaciones);
    nuevoSemestre.calcularSemanasTotales();
    this.estudiante.configurarSemestre(nuevoSemestre);
  }


  // --- Materias ---
  agregarMateria(materia: Materia) {
    this.estudiante?.crearMateria(materia);
  }

  editarMateria(idMateria: number, cambios: Partial<Materia>) {
    const materia = this.estudiante?.materias.find(m => m.idMateria === idMateria);
    if (materia) {
      if (cambios.nombre !== undefined) materia.nombre = cambios.nombre;
      if (cambios.color !== undefined) materia.color = cambios.color;
      if (cambios.creditos !== undefined) materia.creditos = cambios.creditos;
      if (cambios.profesor !== undefined) materia.profesor = cambios.profesor;
      if (cambios.salon !== undefined) materia.salon = cambios.salon;
    }
  }

  eliminarMateria(idMateria: number) {
    if (this.estudiante) {
      this.estudiante.materias = this.estudiante.materias.filter(
        m => m.idMateria !== idMateria
      );
    }
  }

  validarDuplicadoMateria(nombre: string): boolean {
    return this.estudiante?.duplicadoMaterias(nombre) ?? false;
  }

  calcularDefinitivaMateria(idMateria: number): number {
    return this.estudiante?.calcularDefinitivaMateria(idMateria) ?? 0;
  }

  obtenerMaterias(): Materia[] {
    if (!this.estudiante) {
      return [];
    }
    return this.estudiante.materias;
  }

  //-- Registro de horas de estudio en materia
  calcularProporcionEstudio(): { [nombreMateria: string]: number } {
    if (!this.estudiante) throw new Error('No hay estudiante creado');

    // Filtrar solo materias activas (no finalizadas)
    const materiasActivas = this.estudiante.materias.filter(m => !m.finalizado);

    // Calcular total de horas acumuladas
    const totalHoras = materiasActivas.reduce(
      (acc, m) => acc + m.calcularHorasAcumuladas(),
      0
    );

    // Calcular proporción por materia
    const proporciones: { [nombreMateria: string]: number } = {};
    materiasActivas.forEach(m => {
      const horas = m.calcularHorasAcumuladas();
      proporciones[m.nombre] = totalHoras > 0 ? (horas / totalHoras) * 100 : 0;
    });

    return proporciones;
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
