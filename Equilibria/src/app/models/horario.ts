export class Horario {
  constructor(
    public id: number,
    // 1 = Lunes .. 6 = Sábado
    public dia: number,
    // hora inicio en formato entero 0..23
    public horaInicio: number,
    // duración en horas (por requerimiento por defecto 1)
    public duracionHoras: number = 1
  ) {}

  obtenerFin(): number {
    return this.horaInicio + this.duracionHoras;
  }
}
