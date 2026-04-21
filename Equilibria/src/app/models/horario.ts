export class Horario {
  constructor(
    // id
    public id: number,
    // id materia a la que pertenece
    public idMateria: number,
    // 1 = Lunes .. 6 = Sábado
    public dia: number,
    // hora inicio en formato entero 0..23
    public horaInicio: number,
    // duración en horas (por requerimiento por defecto 1)
    public duracionHoras: number = 1,
    // salón opcional por bloque horario (una materia puede tener distintos salones por horario)
    public salon?: string
  ) {}

  obtenerFin(): number {
    return this.horaInicio + this.duracionHoras;
  }
}
