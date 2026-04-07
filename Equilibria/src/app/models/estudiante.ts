import { Materia } from './materia';
import { Recordatorio } from './recordatorio';
import { Semestre } from './semestre';

export class Estudiante {
  public idEstudiante: string;
  public createdAt?: string;
  public updatedAt?: string;
  public lastSyncAt?: string;
  public dirty: boolean = false; // marcar cambios no sincronizados
  public version: number = 1; // optimistc concurrency / control de cambios

  constructor(
    idEstudiante: string | undefined,
    public nombre: string,
    public avatar: string,
    public materias: Materia[] = [],
    public recordatorios: Recordatorio[] = [],
    public semestre: Semestre | null = null
  ) {
    this.idEstudiante = idEstudiante ?? Estudiante.generateId();
    this.createdAt = new Date().toISOString();
  }

  // Generador simple de id (puede reemplazarse por UUID en backend)
  static generateId(): string {
    return 'st_' + Date.now().toString(36) + Math.floor(Math.random() * 10000).toString(36);
  }

  // Devuelve la representación mínima que el backend necesita para el listado público
  toSummaryDTO() {
    return { id: this.idEstudiante, nombre: this.nombre, avatar: this.avatar };
  }

  // DTO completo para sincronización
  toDTO() {
    return {
      id: this.idEstudiante,
      nombre: this.nombre,
      avatar: this.avatar,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      version: this.version
      // NOTA: no incluir objetos pesados si el endpoint solo necesita resumen
    };
  }

  static fromDTO(dto: any): Estudiante {
    const e = new Estudiante(dto.id, dto.nombre, dto.avatar);
    e.createdAt = dto.createdAt;
    e.updatedAt = dto.updatedAt;
    e.version = dto.version ?? 1;
    e.lastSyncAt = new Date().toISOString();
    e.dirty = false;
    return e;
  }

  markDirty(flag: boolean = true) {
    this.dirty = flag;
    if (flag) this.updatedAt = new Date().toISOString();
  }

  // --- Métodos básicos de estudiante ---
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

  // método utilitario para UI/servicio
  getSummary() {
    return this.toSummaryDTO();
  }
}
