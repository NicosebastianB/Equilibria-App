export class Tarea {
  constructor(
    public idMateria: number,
    public idTarea: number,
    public nombre: string,
    public fecha: Date,
    public tipoRecordatorio: string,
    public estado: boolean = false // false = pendiente, true = completado
  ) {}

  completado() {
    this.estado = true;
  }

  pendiente() {
    this.estado = false;
  }
}
