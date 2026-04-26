export class Tarea {
  public estado: boolean = false;
  public idTarea: number = 0; // se asigna después

  constructor(
    public idMateria: number,
    public nombre: string,
    public fecha: Date,
    public tipoRecordatorio: string,
  ) {}

  completado() {
    this.estado = true;
  }

  pendiente() {
    this.estado = false;
  }
}
