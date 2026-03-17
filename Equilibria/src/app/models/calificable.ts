export class Calificable {
  constructor(
    public idMateria: number,
    public idCorte: number,
    public idActividad: number,
    public idCalificable: number,
    public nombre: string,
    public fecha: Date,
    public tipoRecordatorio: string,
    public nota?: number
  ) {}

  validarNota(): boolean {
    // Ejemplo: nota válida entre 0 y 5
    return this.nota !== undefined && this.nota >= 0 && this.nota <= 5;
  }
}
