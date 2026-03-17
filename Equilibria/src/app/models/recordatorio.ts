export class Recordatorio {
  constructor(
    public idRecordatorio: number,
    public nombre: string,
    public color: string,
    public frecuencia: string,
    public modoEstudio: string,
    public notificacionesActivas: boolean = true
  ) {}

  activarNotificaciones() {
    this.notificacionesActivas = true;
  }

  desactivarNotificaciones() {
    this.notificacionesActivas = false;
  }
}
