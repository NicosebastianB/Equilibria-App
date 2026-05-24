import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Recordatorio } from '../models/recordatorio';
import { RecordatorioSaludable } from '../models/recordatorios-saludables';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';

export type BienestarRecordatorio = Recordatorio & { isCustom?: boolean };

@Component({
  selector: 'app-bienestar',
  templateUrl: './bienestar.page.html',
  styleUrls: ['./bienestar.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonList,
    IonIcon
  ]
})
export class BienestarPage implements OnInit {
  recordatorios: BienestarRecordatorio[] = [];
  newNombre = '';
  newColor = 'amarillo';
  newFrecuencia = 'daily';
  newModoEstudio: 'on' | 'off' = 'on';
  newNotificacionesActivas = true;

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

  private readonly storageKey = 'bienestarRecordatorios';

  constructor(
    
  ) {}

  ngOnInit() {
    this.loadRecordatorios();
  }

  private loadRecordatorios() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Array<Partial<BienestarRecordatorio>>;
        this.recordatorios = parsed.map((item) => this.buildRecordatorio(item));
        return;
      } catch {
        // ignore invalid storage and fall back to defaults
      }
    }

    this.recordatorios = RecordatorioSaludable.map((item) => {
      const recordatorio = new Recordatorio(
        item.idRecordatorio,
        item.nombre,
        item.color,
        item.frecuencia,
        item.modoEstudio,
        item.notificacionesActivas
      ) as BienestarRecordatorio;
      recordatorio.isCustom = false;
      return recordatorio;
    });
  }

  private buildRecordatorio(data: Partial<BienestarRecordatorio>): BienestarRecordatorio {
    const recordatorio = new Recordatorio(
      data.idRecordatorio ?? this.nextId(),
      data.nombre ?? '',
      data.color ?? 'amarillo',
      data.frecuencia ?? 'daily',
      data.modoEstudio ?? 'on',
      data.notificacionesActivas ?? true
    ) as BienestarRecordatorio;
    recordatorio.isCustom = data.isCustom ?? false;
    return recordatorio;
  }

  persistRecordatorios() {
    const payload = this.recordatorios.map((recordatorio) => ({
      idRecordatorio: recordatorio.idRecordatorio,
      nombre: recordatorio.nombre,
      color: recordatorio.color,
      frecuencia: recordatorio.frecuencia,
      modoEstudio: recordatorio.modoEstudio,
      notificacionesActivas: recordatorio.notificacionesActivas,
      isCustom: recordatorio.isCustom ?? false
    }));
    localStorage.setItem(this.storageKey, JSON.stringify(payload));
  }

  getColorHex(nombreColor: string): string {
    const color = this.colores.find((c) => c.value === nombreColor);
    return color ? color.hex : '#ffffff';
  }

  updateModoEstudio(recordatorio: BienestarRecordatorio, estado: boolean) {
    recordatorio.modoEstudio = estado ? 'on' : 'off';
    this.persistRecordatorios();
  }

  agregarRecordatorioPersonalizado() {
    const nombre = this.newNombre.trim();
    if (!nombre) {
      return;
    }

    const custom = new Recordatorio(
      this.nextId(),
      nombre,
      this.newColor,
      this.newFrecuencia,
      this.newModoEstudio,
      this.newNotificacionesActivas
    ) as BienestarRecordatorio;
    custom.isCustom = true;
    this.recordatorios.push(custom);
    this.persistRecordatorios();
    this.resetNuevoRecordatorio();
  }

  eliminarRecordatorio(recordatorio: BienestarRecordatorio) {
    if (!recordatorio.isCustom) {
      return;
    }
    this.recordatorios = this.recordatorios.filter((item) => item.idRecordatorio !== recordatorio.idRecordatorio);
    this.persistRecordatorios();
  }

  private nextId(): number {
    const maxId = Math.max(4, ...this.recordatorios.map((item) => item.idRecordatorio));
    return maxId + 1;
  }

  private resetNuevoRecordatorio() {
    this.newNombre = '';
    this.newColor = 'amarillo';
    this.newFrecuencia = 'daily';
    this.newModoEstudio = 'on';
    this.newNotificacionesActivas = true;
  }
}
