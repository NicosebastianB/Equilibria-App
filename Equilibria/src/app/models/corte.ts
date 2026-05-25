import { Actividad } from './actividad';

export class Corte {


  public notaDefinitiva: number = 0;
  private nextActividadId = 1;
  constructor(
    public idMateria: number,
    public idCorte: number,
    public nombre: string,
    public porcentaje: number,
    public actividades: Actividad[] = [],
    public fijo: boolean = false
  )
  {
    if (!actividades || actividades.length === 0) {
      this.actividades = [
        new Actividad(this.idMateria, this.idCorte, this.idCorte * 10 + 1, 'Actividad 1', 100)
      ];
    }
  }

  crearActividad(nombre: string, porcentaje: number): Actividad {
    // 🔑 Calcular siempre el máximo ID relativo dentro del corte
    const maxId = this.actividades.length > 0
      ? Math.max(...this.actividades.map(a => a.idActividad - this.idCorte * 10))
      : 0;

    const idActividad = this.idCorte * 10 + (maxId + 1);

    console.log(`[CREAR] Corte ${this.idCorte} creando actividad con ID ${idActividad}, nombre: ${nombre}`);

    const nueva = new Actividad(this.idMateria, this.idCorte, idActividad, nombre, porcentaje);
    this.actividades.push(nueva);

    console.log("[CREAR] Actividades actuales en corte:", this.actividades.map(a => ({
      id: a.idActividad,
      nombre: a.nombre,
      porcentaje: a.porcentaje
    })));

    return nueva;
  }



  validarPorcentajes(): boolean {
    const total = this.actividades.reduce((acc, a) => acc + (a.porcentaje ?? 0), 0);
    return total === 100;
  }

  calcularDefinitiva(): number {

    const total = this.actividades.reduce((acc, act) => {
      const notaAct = act.calcularDefinitiva();

      return acc + (notaAct * (act.porcentaje / 100));
    }, 0);

    this.notaDefinitiva = total;
    return this.notaDefinitiva;
  }

}
