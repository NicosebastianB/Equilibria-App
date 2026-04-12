import { Calificable } from './calificable';

export class Actividad {
  constructor(
    public idMateria: number,
    public idCorte: number,
    public idActividad: number,
    public nombre: string,
    public porcentaje: number,
    public calificables: Calificable[] = [],
    public notaDefinitiva?: number,
    public fijo : boolean = false // atributo técnico para edición temporal
  ) {}

  agregarCalificable(calificable: Calificable) {
    this.calificables.push(calificable);
  }

  calcularDefinitiva(): number {
    if (this.calificables.length === 0) {
      this.notaDefinitiva = 0;
      return 0;
    }
    const totalNotas = this.calificables.reduce((acc, c) => acc + (c.nota ?? 0), 0);
    this.notaDefinitiva = totalNotas / this.calificables.length;
    return this.notaDefinitiva;
  }

}
