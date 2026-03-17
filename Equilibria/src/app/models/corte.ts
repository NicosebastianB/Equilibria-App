export class Corte {
  constructor(
    public idMateria: number,
    public idCorte: number,
    public nombre: string,
    public porcentaje: number,
    public actividades: any[] = [],
    public notaDefinitiva?: number
  ) {}

  agregarActividad(actividad: any) {
    this.actividades.push(actividad);
  }

  editarActividad(idActividad: number, nuevaActividad: any) {
    const index = this.actividades.findIndex(a => a.idActividad === idActividad);
    if (index !== -1) {
      this.actividades[index] = nuevaActividad;
    }
  }

  eliminarActividad(idActividad: number) {
    this.actividades = this.actividades.filter(a => a.idActividad !== idActividad);
  }

  validarPorcentajes(): boolean {
    const total = this.actividades.reduce((acc, a) => acc + (a.porcentaje ?? 0), 0);
    return total <= 100;
  }

  calcularDefinitiva(): number {
    const totalNotas = this.actividades.reduce((acc, a) => acc + (a.notaDefinitiva ?? 0), 0);
    this.notaDefinitiva = totalNotas;
    return this.notaDefinitiva;
  }
}
