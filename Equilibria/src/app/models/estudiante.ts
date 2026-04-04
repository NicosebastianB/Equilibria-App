import { Materia } from './materia';
import { Recordatorio } from './recordatorio';
import { Semestre } from './semestre';

export class Estudiante {
  constructor(
    public nombre: string,
    public avatar: string,
    public materias: Materia[] = [],
    public recordatorios: Recordatorio[] = [],
    public semestre: Semestre | null = null
  ) {}

  // Métodos básicos de estudiante
  cambiarNombre(nuevoNombre: string) {
    this.nombre = nuevoNombre;
  }

  cambiarAvatar(nuevoAvatar: string) {
    this.avatar = nuevoAvatar;
  }

  configurarSemestre(semestre: Semestre) {
    this.semestre = semestre;
  }

  obtenerSemanaActual(fechaHoy: Date): number {
    if (!this.semestre) throw new Error('No hay semestre configurado');
    return this.semestre.calcularSemanaActual(fechaHoy);
  }

  obtenerSemanasTotales(): number {
    if (!this.semestre) throw new Error('No hay semestre configurado');
    return this.semestre.calcularSemanasTotales();
  }

  crearMateria(materia: Materia) {
    this.materias.push(materia);
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
