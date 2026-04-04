import { Semestre } from '../models/semestre';

export class SemestreService {
  private semestre: Semestre | null = null;


  configurarSemestre(id: number, nombre: string, fechaInicio: Date, fechaFin: Date, vacaciones: { inicio: Date; fin: Date }[] = []): Semestre {
    this.semestre = new Semestre(id, nombre, fechaInicio, fechaFin, vacaciones);
    this.semestre.calcularSemanasTotales();
    return this.semestre;
  }

  obtenerSemanaActual(fechaHoy: Date): number {
    if (!this.semestre) throw new Error('No hay semestre configurado');
    return this.semestre.calcularSemanaActual(fechaHoy);
  }

  esVacaciones(fecha: Date): boolean {
    if (!this.semestre) throw new Error('No hay semestre configurado');
    return this.semestre.esSemanaDeVacaciones(fecha);
  }

  getSemestre(): Semestre | null {
    return this.semestre;
  }
}
