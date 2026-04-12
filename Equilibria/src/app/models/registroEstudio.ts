export class RegistroEstudio {
  constructor(
    public idRegistro: number,       // identificador único
    public idMateria: number,        // referencia a la materia
    public fecha: Date,              // cuándo se estudió
    public duracionMinutos: number,  // cuánto tiempo duró
  ) {}
}
