import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private materias = [
    { id: 1, nombre: 'Matemáticas', profesor: 'Juan' },
    { id: 2, nombre: 'Física', profesor: 'Ana' },
    { id: 3, nombre: 'Programación', profesor: 'Carlos' },
  ];

  private tareas: { id: number; titulo: string; materiaId: number }[] = [];

  constructor() {
    this.cargarDatos();
  }

  // Cargar desde localStorage
  private cargarDatos() {
    const tareasGuardadas = localStorage.getItem('tareas');

    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
    } else {
      // datos iniciales SOLO si no hay nada guardado
      this.tareas = [
        { id: 1, titulo: 'Tarea 1', materiaId: 1 },
        { id: 2, titulo: 'Proyecto Física', materiaId: 2 },
      ];
      this.guardarDatos();
    }
  }

  // Guardar en localStorage
  private guardarDatos() {
    console.log('Guardando tareas:', this.tareas);
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  addTarea(tarea: any) {
    this.tareas.push(tarea);
    this.guardarDatos();
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter((t) => t.id !== id);
    this.guardarDatos();
  }

  getMaterias() {
    return this.materias;
  }

  getTareas() {
    return this.tareas;
  }
}
