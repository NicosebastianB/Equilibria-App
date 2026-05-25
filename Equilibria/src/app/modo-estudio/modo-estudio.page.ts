import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Materia } from '../models/materia';
import { MateriaService } from '../services/MateriaService';
import { MockService } from '../services/MockService';
import { DataService } from '../services/data';
import { TemporizadorConfig } from '../models/temporizadorConfig';
import { Recordatorio } from '../models/recordatorio';
import { RecordatorioSaludable } from '../models/recordatorios-saludables';
import { interval, Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
  IonList,
  IonItem,
  IonModal,
  IonChip,
  IonSelect,
  IonSelectOption,
  IonPopover,
  IonInput,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonNote,
  IonBackButton,
  IonAccordion,
  IonAccordionGroup,
  IonText,
  IonCheckbox,
  IonProgressBar,
  IonToggle,
  IonDatetime,
  IonPicker,
  IonPickerColumn,
  IonDatetimeButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-modo-estudio',
  templateUrl: './modo-estudio.page.html',
  styleUrls: ['./modo-estudio.page.scss'],
  standalone: true,
  imports:
    [
      FormsModule,
      CommonModule,
      RouterModule,
      FormsModule,
      RouterModule,
      IonContent,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonButtons,
      IonButton,
      IonIcon,
      IonLabel,
      IonItem,
      IonModal,
      IonChip,
      IonSelect,
      IonSelectOption,
      IonInput,
      IonNote,
      IonProgressBar,
      IonToggle,
      IonDatetime
    ]
})


export class ModoEstudioPage implements OnInit, OnDestroy {

  materiasActivas: Materia[] = []; // se cargan desde tu DataService
  materiaSeleccionada: number | null = null;

  config: TemporizadorConfig = new TemporizadorConfig(0, 25, 5, 3, true);

  modalTemporizadorOpen = false;
  tiempoRestante: number = 0; // en segundos
  estadoActual: string = 'Concentración'; // o 'Descanso'

  cumplimientoSemanal: number = 0;

  recordatorioActual: Recordatorio | null = null

  colores = [
    { value: 'amarillo', hex: '#fbf8cc' },
    { value: 'durazno', hex: '#fde4cf' },
    { value: 'naranja', hex: '#ffcfd2' },
    { value: 'rosa', hex: '#f1c0e8' },
    { value: 'morado', hex: '#cfbaf0' },
    { value: 'violeta', hex: '#a3c4f3' },
    { value: 'azul', hex: '#90dbf4' },
    { value: 'cian', hex: '#8eecf5' },
    { value: 'aguamarina', hex: '#98f5e1' },
    { value: 'verde', hex: '#b9fbc0' }
  ];

  private ciclosRestantes: number = 0;
  private timerSub?: Subscription;

  private obtenerRecordatorioAleatorio(): Recordatorio | null {
    const disponibles = RecordatorioSaludable.filter(r =>
      r.modoEstudio === 'on' && r.notificacionesActivas
    );
    if (disponibles.length === 0) return null;
    const index = Math.floor(Math.random() * disponibles.length);
    return disponibles[index];
  }

  get tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoRestante / 60);
    const segundos = this.tiempoRestante % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }

  constructor
    (
    private dataService: DataService,
    private materiaService: MateriaService,
    private toastController: ToastController,
    private mockService: MockService,

  ) { }

  ngOnInit() {
    this.materiasActivas = this.dataService.getMateriasActivas();

  }



  // Mapea el nombre del color del recordatorio al hex de la paleta
  getHexColor(color: string): string {
    const encontrado = this.colores.find(c => c.value === color);
    return encontrado ? encontrado.hex : '#cccccc'; // fallback gris
  }

  // Emojis asociados
  obtenerEmoji(nombre: string): string {
    switch (nombre) {
      case 'Bebe agua': return '💧';
      case 'Cuida tu postura': return '🪑';
      case 'Toma un descanso activo': return '🏃';
      case 'Descansa la vista': return '👀';
      default: return '✨';
    }
  }

  ngOnDestroy() {
    this.detenerTemporizador();
  }

  async iniciarTemporizador() {
    if (!this.materiaSeleccionada) return;

    // 🚨 Validación: concentración > 0
    if (this.config.tiempoConcentracion <= 0) {
      const toast = await this.toastController.create({
        message: 'Debes seleccionar un tiempo de concentración mayor a 0 minutos.',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    // 🚨 Validación: descanso > 0 (opcional, si quieres evitar descansos vacíos)
    if (this.config.tiempoDescanso <= 0) {
      const toast = await this.toastController.create({
        message: 'Debes seleccionar un tiempo de descanso mayor a 0 minutos.',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      await toast.present();
      return;
    }

    this.config.idMateria = this.materiaSeleccionada;
    this.ciclosRestantes = this.config.numeroCiclos;
    this.estadoActual = 'Concentración';
    this.tiempoRestante = this.config.tiempoConcentracion * 60;

    this.modalTemporizadorOpen = true;
    this.iniciarIntervalo();
  }



  iniciarIntervalo() {
    this.detenerTemporizador();
    this.timerSub = interval(1000).subscribe(() => {
      this.tiempoRestante--;

      if (this.tiempoRestante <= 0) {
        if (this.estadoActual === 'Concentración') {
          this.estadoActual = 'Descanso';
          this.tiempoRestante = this.config.tiempoDescanso * 60;

          // ✅ registrar estudio y actualizar cumplimiento

          this.dataService.agregarRegistro(this.materiaSeleccionada!, {
            idRegistro: Date.now(),
            idMateria: this.materiaSeleccionada!,
            fecha: new Date(),
            duracionMinutos: this.config.tiempoConcentracion
          });
          this.actualizarCumplimiento();

          // ⚠️ mostrar recordatorio saludable aleatorio

          if (this.config.recordatoriosSaludables) {
            const recordatorio = this.obtenerRecordatorioAleatorio();
            if (recordatorio) {
              this.recordatorioActual = recordatorio;
              setTimeout(() => this.recordatorioActual = null, 4000);
            }
          }


        } else {
          this.ciclosRestantes--;
          if (this.ciclosRestantes > 0) {
            this.estadoActual = 'Concentración';
            this.tiempoRestante = this.config.tiempoConcentracion * 60;
          } else {
            this.finalizarTemporizador();
          }
        }
      }
    });
  }



  pausarTemporizador() {
    this.timerSub?.unsubscribe();
  }

  reanudarTemporizador() {
    this.iniciarIntervalo();
  }

  finalizarTemporizador() {
    this.detenerTemporizador();
    this.modalTemporizadorOpen = false;

    // ⚠️ Advertencia al usuario
    this.toastController.create({
      message: 'Recuerda: solo los ciclos completados se registran. Si cierras antes, no se guardará tu progreso.',
      duration: 3000,
      color: 'warning',
      position: 'top'
    }).then(toast => toast.present());

    this.actualizarCumplimiento(); // refrescar barra
  }

  cerrarTemporizador() {
    this.detenerTemporizador();
    this.modalTemporizadorOpen = false;
    // ⚠️ Advertencia al usuario
    this.toastController.create({
      message: 'Recuerda: solo los ciclos completados se registran. Si cierras antes, no se guardará tu progreso.',
      duration: 3000,
      color: 'warning',
      position: 'top'
    }).then(toast => toast.present());
  }


  private detenerTemporizador() {
    this.timerSub?.unsubscribe();
    this.timerSub = undefined;
  }

  actualizarCumplimiento() {
    const materia = this.dataService.getMaterias().find(m => m.idMateria === this.materiaSeleccionada);
    const semestre = this.dataService.obtenerSemestre() || this.mockService.getSemestre();

    if (materia && semestre) {
      this.cumplimientoSemanal = this.materiaService.obtenerCumplimientoSemanal(materia, semestre);
    }
  }

  onDuracionChange(event: any, tipo: 'concentracion' | 'descanso') {
    const value = event.detail.value; // Ej: "00:25"
    // El ion-datetime devuelve un string en formato HH:mm
    const [hours, minutes] = value.split(':').map(Number);
    const totalMinutos = (hours * 60) + minutes;

    if (tipo === 'concentracion') {
      this.config.tiempoConcentracion = totalMinutos;
    } else {
      this.config.tiempoDescanso = totalMinutos;
    }
  }

  formatearDuracion(minutos: number): string {
    const h = Math.floor(minutos / 60).toString().padStart(2, '0');
    const m = (minutos % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  }

  ionViewWillEnter() {
    if (this.materiaSeleccionada) {
      this.actualizarCumplimiento();
    }
  }






}
