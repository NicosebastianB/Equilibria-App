import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { calendarOutline, calendarClearOutline, createOutline } from 'ionicons/icons';
import { AvatarService } from '../services/avatar.service';
import { EstudianteService } from '../services/EstudianteService';
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
  IonItemDivider,
  IonAvatar,
  IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonItemDivider,
    IonAvatar,
    IonBackButton,
    
  ],
  providers: [ModalController]
})
export class SettingsPage implements OnInit {
  nombre = '';
  avatar = '';
  semestreInicio = '';
  semestreFin = '';
  vacacionesInicio = '';
  vacacionesFin = '';
  avatarFiles: { filename: string; url: string }[] = [];

  popoverInicioSemestre = false;
  popoverFinSemestre = false;
  popoverInicioVacaciones = false;
  popoverFinVacaciones = false;

  constructor(private avatarSrv: AvatarService, private estSrv: EstudianteService, private modalCtrl: ModalController) {
    addIcons({ calendarOutline, createOutline });
  }

  private parseDate(value: string | Date): string {
    const d = new Date(value);
    // Devuelve formato yyyy-MM-dd sin desfase
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }


  ngOnInit() {
    this.avatarFiles = this.avatarSrv.getAvatarObjects();
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario) {
      this.nombre = usuario.nombre || '';
      this.avatar = usuario.avatar || '';
      this.semestreInicio = usuario.semestre?.fechaInicio ? this.parseDate(usuario.semestre.fechaInicio) : '';
      this.semestreFin = usuario.semestre?.fechaFin ? this.parseDate(usuario.semestre.fechaFin) : '';
      this.vacacionesInicio = usuario.semestre?.vacaciones?.[0]?.inicio ? this.parseDate(usuario.semestre.vacaciones[0].inicio) : '';
      this.vacacionesFin = usuario.semestre?.vacaciones?.[0]?.fin ? this.parseDate(usuario.semestre.vacaciones[0].fin) : '';
    }
  }




  async cerrarModal() {
    const modal = await this.modalCtrl.getTop();
    if (modal) {
      await modal.dismiss();
    }
  }

  guardarPerfil() {
    // tu lógica de guardado de perfil
    this.guardarCambios(); // si ya tienes este método para persistir
    this.cerrarModal();    // cerrar modal automáticamente
  }

  guardarSemestre() {
    // tu lógica de guardado de semestre
    this.guardarCambios(); // reutiliza el mismo método si guarda todo
    this.cerrarModal();    // cerrar modal automáticamente
  }

  confirmarFecha(tipo: string) {
    switch (tipo) {
      case 'semestreInicio':
        console.log('Fecha inicio semestre:', this.semestreInicio);
        this.popoverInicioSemestre = false;
        break;
      case 'semestreFin':
        console.log('Fecha fin semestre:', this.semestreFin);
        this.popoverFinSemestre = false;
        break;
      case 'vacacionesInicio':
        console.log('Fecha inicio vacaciones:', this.vacacionesInicio);
        this.popoverInicioVacaciones = false;
        break;
      case 'vacacionesFin':
        console.log('Fecha fin vacaciones:', this.vacacionesFin);
        this.popoverFinVacaciones = false;
        break;
    }
  }

  selectAvatar(filename: string) {
    this.avatar = filename;
  }

  getAvatarUrl(filename?: string): string {
    return this.avatarSrv.getAvatarUrl(filename);
  }


  get canSave(): boolean {
    return !!(this.nombre && this.avatar && this.semestreInicio && this.semestreFin);
  }

  guardarCambios() {
    const usuarioActualizado = {
      nombre: this.nombre,
      avatar: this.avatar,
      semestre: {
        fechaInicio: this.semestreInicio,
        fechaFin: this.semestreFin,
        vacaciones: [{ inicio: this.vacacionesInicio, fin: this.vacacionesFin }]
      }
    };
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
  }
}
