import { Injectable } from '@angular/core';
import { Recordatorio } from '../models/recordatorio';
import { RecordatorioSaludable } from '../models/recordatorios-saludables';

@Injectable({ providedIn: 'root' })
export class RecordatorioService {
  private recordatorios: Recordatorio[] = [];

  constructor() {
    // Inicializar con los saludables por defecto
    this.recordatorios = [...RecordatorioSaludable];
  }

  obtenerRecordatorios(): Recordatorio[] {
    return this.recordatorios;
  }

  agregarRecordatorio(recordatorio: Recordatorio) {
    this.recordatorios.push(recordatorio);
  }

  editarRecordatorio(id: number, cambios: Partial<Recordatorio>) {
    const rec = this.recordatorios.find(r => r.idRecordatorio === id);
    if (rec) Object.assign(rec, cambios);
  }

  eliminarRecordatorio(id: number) {
    this.recordatorios = this.recordatorios.filter(r => r.idRecordatorio !== id);
  }

  configurarRecordatorio(id: number, nuevaConfig: Recordatorio) {
    const index = this.recordatorios.findIndex(r => r.idRecordatorio === id);
    if (index !== -1) {
      this.recordatorios[index] = nuevaConfig;
    }
  }

}
