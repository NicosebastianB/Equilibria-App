import { Calificable } from './calificable';


export class Actividad {

  private nextCalificableId = 1;
  constructor(
    public idMateria: number,
    public idCorte: number,
    public idActividad: number, // se pasa desde Corte
    public nombre: string,
    public porcentaje: number,
    public calificables: Calificable[] = [],
    public notaDefinitiva?: number,
    public fijo: boolean = false
  )
  {
    const maxId = calificables.length > 0
      ? Math.max(...calificables.map(c => c.idCalificable % 10)) // último dígito
      : 0;
    this.nextCalificableId = maxId + 1;
  }

  crearCalificable(nombre: string, fecha: Date, tipoRecordatorio: string): Calificable {
    const idCalificable = this.idActividad * 10 + this.nextCalificableId++;
    const nuevo = new Calificable(this.idMateria, this.idCorte, this.idActividad, idCalificable, nombre, fecha, tipoRecordatorio);
    this.calificables.push(nuevo);
    return nuevo;
  }

  agregarCalificable(calificable: Calificable) {
    this.calificables.push(calificable);
    this.calcularDefinitiva();
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
