export class Semestre {
  constructor(
    public idSemestre: number,
    public nombre: string,
    public fechaInicio: Date,
    public fechaFin: Date,
    public vacaciones: { inicio: Date; fin: Date }[] = [],
    public semanasTotales?: number,
    public semanaActual?: number
  ) {}

  calcularSemanasTotales(): number {
    const diffMs = this.fechaFin.getTime() - this.fechaInicio.getTime();
    const totalSemanas = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)) + 1;

    // Restar semanas de vacaciones
    let semanasVacaciones = 0;
    this.vacaciones.forEach(v => {
      const diffVac = v.fin.getTime() - v.inicio.getTime();
      semanasVacaciones += Math.floor(diffVac / (1000 * 60 * 60 * 24 * 7)) + 1;
    });

    this.semanasTotales = totalSemanas - semanasVacaciones;
    return this.semanasTotales;
  }

  calcularSemanaActual(fechaHoy: Date): number {
    if (this.esSemanaDeVacaciones(fechaHoy)) {
      return 0; // Semana de vacaciones, no se cuenta
    }

    const diffMs = fechaHoy.getTime() - this.fechaInicio.getTime();
    const semana = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)) + 1;

    this.semanaActual = semana;
    return semana;
  }

  esSemanaDeVacaciones(fecha: Date): boolean {
    return this.vacaciones.some(v => fecha >= v.inicio && fecha <= v.fin);
  }
}
