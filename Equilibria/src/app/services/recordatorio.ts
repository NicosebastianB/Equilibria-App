import { Injectable } from '@angular/core';
import { Recordatorio } from '../models/recordatorio';

@Injectable({
  providedIn: 'root'
})
export class RecordatorioService {
  private recordatorios: Recordatorio[] = [];

  agregarRecordatorio(recordatorio: Recordatorio) {
    this.recordatorios.push(recordatorio);
  }

  obtenerRecordatorios(): Recordatorio[] {
    return this.recordatorios;
  }

  activarTodos() {
    this.recordatorios.forEach(r => r.activarNotificaciones());
  }

  desactivarTodos() {
    this.recordatorios.forEach(r => r.desactivarNotificaciones());
  }
}
