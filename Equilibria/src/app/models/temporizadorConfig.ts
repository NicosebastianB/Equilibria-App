export class TemporizadorConfig {
  constructor(
    public idMateria: number,
    public tiempoConcentracion: number,
    public tiempoDescanso: number,
    public numeroCiclos: number,
    public recordatoriosSaludables: boolean
  ) {}
}
