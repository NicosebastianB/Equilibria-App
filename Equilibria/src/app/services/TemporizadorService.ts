import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { TemporizadorConfig } from '../models/temporizadorConfig';
import { TemporizadorEstado } from '../models/temporizadorEstado';

@Injectable({ providedIn: 'root' })
export class TemporizadorService {
  private config: TemporizadorConfig | null = null;
  private estado: TemporizadorEstado | null = null;
  private countdownSub: Subscription | null = null;

  configurar(config: TemporizadorConfig) {
    this.config = config;
    this.estado = new TemporizadorEstado(1, 'concentracion', config.tiempoConcentracion * 60);
  }

  iniciar() {
    if (!this.estado) throw new Error('No hay configuración de temporizador');

    // Cancelar cualquier temporizador previo
    this.countdownSub?.unsubscribe();

    // Crear un intervalo que emite cada segundo
    this.countdownSub = interval(1000).subscribe(() => {
      if (this.estado!.tiempoRestante > 0) {
        this.estado!.tiempoRestante--;
      } else {
        this.countdownSub?.unsubscribe();
        this.avanzarFase();
        // Reiniciar automáticamente si no está finalizado
        if (this.estado!.fase !== 'finalizado') {
          this.iniciar();
        }
      }
    });
  }

  avanzarFase() {
    if (!this.estado || !this.config) return;

    if (this.estado.fase === 'concentracion') {
      this.estado.fase = 'descanso';
      this.estado.tiempoRestante = this.config.tiempoDescanso * 60;
    } else if (this.estado.fase === 'descanso') {
      if (this.estado.cicloActual < this.config.numeroCiclos) {
        this.estado.cicloActual++;
        this.estado.fase = 'concentracion';
        this.estado.tiempoRestante = this.config.tiempoConcentracion * 60;
      } else {
        this.estado.fase = 'finalizado';
        this.estado.tiempoRestante = 0;
      }
    }
  }

  obtenerEstado(): TemporizadorEstado | null {
    return this.estado;
  }

  detener() {
    this.countdownSub?.unsubscribe();
    this.countdownSub = null;
  }
}
