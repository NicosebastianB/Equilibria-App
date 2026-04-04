export class TemporizadorEstado {
  constructor(
    public cicloActual: number,
    public fase: 'concentracion' | 'descanso' | 'finalizado',
    public tiempoRestante: number
  ) {}
}
