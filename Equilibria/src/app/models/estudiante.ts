import { Materia } from './materia';
import { Recordatorio } from './recordatorio';

export class Estudiante {
  constructor(
    public nombre: string,
    public avatar: string,
    public materias: Materia[] = [],
    public recordatorios: Recordatorio[] = []
  ) {}

  // Métodos básicos de estudiante
  cambiarNombre(nuevoNombre: string) {
    this.nombre = nuevoNombre;
  }

  cambiarAvatar(nuevoAvatar: string) {
    this.avatar = nuevoAvatar;
  }

  // --- Gestión de materias ---
  crearMateria(materia: Materia) {
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

  duplicadoMaterias(nombre: string): boolean {
    return this.materias.some(m => m.nombre === nombre);
  }

  calcularDefinitivaMateria(idMateria: number): number {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    return materia ? materia.calcularDefinitiva() : 0;
  }

  // --- Gestión de recordatorios ---
  crearRecordatorio(recordatorio: Recordatorio) {
    this.recordatorios.push(recordatorio);
  }

  editarRecordatorio(idRecordatorio: number, nuevoRecordatorio: Recordatorio) {
    const index = this.recordatorios.findIndex(r => r.idRecordatorio === idRecordatorio);
    if (index !== -1) {
      this.recordatorios[index] = nuevoRecordatorio;
    }
  }

  eliminarRecordatorio(idRecordatorio: number) {
    this.recordatorios = this.recordatorios.filter(r => r.idRecordatorio !== idRecordatorio);
  }

  duplicadoRecordatorios(nombre: string): boolean {
    return this.recordatorios.some(r => r.nombre === nombre);
  }

  activarTodosLosRecordatorios() {
    this.recordatorios.forEach(r => r.activarNotificaciones());
  }

  desactivarTodosLosRecordatorios() {
    this.recordatorios.forEach(r => r.desactivarNotificaciones());
  }
}
