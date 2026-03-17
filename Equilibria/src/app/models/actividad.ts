import { Calificable } from './calificable';

export class Actividad {
  constructor(
    public idMateria: number,
    public idCorte: number,
    public idActividad: number,
    public nombre: string,
    public porcentaje: number,
    public calificables: Calificable[] = [],
    public notaDefinitiva?: number
  ) {}

  agregarCalificable(calificable: Calificable) {
    this.calificables.push(calificable);
  }

  editarCalificable(idCalificable: number, nuevoCalificable: Calificable) {
    const index = this.calificables.findIndex(c => c.idCalificable === idCalificable);
    if (index !== -1) {
      this.calificables[index] = nuevoCalificable;
    }
  }

  eliminarCalificable(idCalificable: number) {
    this.calificables = this.calificables.filter(c => c.idCalificable !== idCalificable);
  }

  calcularDefinitiva(): number {
    const totalNotas = this.calificables.reduce((acc, c) => acc + (c.nota ?? 0), 0);
    this.notaDefinitiva = totalNotas;
    return this.notaDefinitiva;
  }
}
