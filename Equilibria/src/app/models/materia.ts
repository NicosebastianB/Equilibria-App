import { Corte } from './corte';
import { Tarea } from './tarea';

export class Materia {
  constructor(
    public idMateria: number,
    public nombre: string,
    public color: string,
    public creditos: number,
    public profesor: string,
    public salon: string,
    public tiempoEstudio: number,
    public definitiva?: number,
    public notaFaltante?: number,
    public cortes: Corte[] = [],
    public tareas: Tarea[] = []
  ) {}

  // --- Gestión de cortes ---
  agregarCorte(corte: Corte) {
    this.cortes.push(corte);
  }

  editarCorte(idCorte: number, nuevoCorte: Corte) {
    const index = this.cortes.findIndex(c => c.idCorte === idCorte);
    if (index !== -1) {
      this.cortes[index] = nuevoCorte;
    }
  }

  eliminarCorte(idCorte: number) {
    this.cortes = this.cortes.filter(c => c.idCorte !== idCorte);
  }

  validarPorcentajes(): boolean {
    const total = this.cortes.reduce((acc, c) => acc + (c.porcentaje ?? 0), 0);
    return total <= 100;
  }

  calcularDefinitiva(): number {
    const totalNotas = this.cortes.reduce((acc, c) => acc + (c.notaDefinitiva ?? 0), 0);
    this.definitiva = totalNotas;
    return this.definitiva;
  }

  // --- Gestión de tareas ---
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

  marcarTareaCompletada(idTarea: number) {
    const tarea = this.tareas.find(t => t.idTarea === idTarea);
    if (tarea) tarea.completado();
  }

  marcarTareaPendiente(idTarea: number) {
    const tarea = this.tareas.find(t => t.idTarea === idTarea);
    if (tarea) tarea.pendiente();
  }

  calcularHorasDeEstudio(): number {
    return this.tiempoEstudio * this.creditos;
  }

  validarCreditos(): boolean {
    return this.creditos > 0;
  }
}
