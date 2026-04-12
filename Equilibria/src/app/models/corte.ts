import { Actividad } from './actividad';

export class Corte {
  constructor(
    public idMateria: number,
    public idCorte: number,
    public nombre: string,
    public porcentaje: number,
    public actividades: Actividad[] = [],
    public notaDefinitiva: number = 0,
    public fijo: boolean = false
  ) {
    // Inicializar con una actividad por defecto si no se pasan actividades
    if (this.actividades.length === 0) {
      this.actividades.push(
        new Actividad(this.idMateria, this.idCorte, 1, 'Actividad 1', 100)
      );
    }
  }

  validarPorcentajes(): boolean {
    const total = this.actividades.reduce((acc, a) => acc + (a.porcentaje ?? 0), 0);
    return total === 100;
  }

  calcularDefinitiva(): number {
    if (this.actividades.length === 0) {
      this.notaDefinitiva = 0;
      return 0;
    }

    const total = this.actividades.reduce((acc, act) => {
      const notaAct = act.calcularDefinitiva(); // usa el método de Actividad
      return acc + (notaAct * (act.porcentaje / 100));
    }, 0);

    this.notaDefinitiva = total;
    return this.notaDefinitiva;
  }


}
