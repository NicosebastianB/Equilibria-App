import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonDatetime, IonModal, IonIcon, IonList, IonNote} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, calendarClearOutline } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { EstudianteService } from '../services/EstudianteService';
import { Estudiante } from '../models/estudiante';
import { AvatarService } from '../services/avatar.service';
import { Semestre } from '../models/semestre';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonDatetime,
    IonModal,
    IonIcon,
    IonList,
    IonNote,
    CommonModule,
    FormsModule,
  ],
})
export class OnboardingPage implements OnInit {
  nombre: string = '';
  avatar: string = '';
  semestreInicio: string = '';
  semestreFin: string = '';
  vacacionesSemestreInicio: string = '';
  vacacionesSemestreFin: string = '';

  avatarFiles: { filename: string; url: string }[] = [];

  constructor(
    private router: Router,
    private estSrv: EstudianteService,
    private avatarSrv: AvatarService,
  ) {
    addIcons({ calendarOutline, calendarClearOutline });
  }

  get isFormComplete(): boolean {
    return !!(
      this.nombre &&
      this.avatar &&
      this.semestreInicio &&
      this.semestreFin &&
      this.vacacionesSemestreInicio &&
      this.vacacionesSemestreFin
    );
  }

  isDatesValid(): boolean {
    if (!this.semestreInicio || !this.semestreFin ||
      !this.vacacionesSemestreInicio || !this.vacacionesSemestreFin) {
      return false;
    }

    const inicio = new Date(this.semestreInicio);
    const fin = new Date(this.semestreFin);
    const vacInicio = new Date(this.vacacionesSemestreInicio);
    const vacFin = new Date(this.vacacionesSemestreFin);

    // Reglas básicas
    if (inicio >= fin) return false;
    if (vacInicio >= vacFin) return false;

    // Vacaciones dentro del semestre
    if (vacInicio < inicio || vacFin > fin) return false;

    return true;
  }

  get canContinue(): boolean {
    return this.isFormComplete && this.isDatesValid();
  }



  ngOnInit() {
    this.avatarFiles = this.avatarSrv.getAvatarObjects();
  }

  completar() {
    // Crear objeto Semestre
    const semestre = new Semestre(
      Date.now(), // idSemestre simple, puedes cambiarlo por un generador
      'Semestre',
      new Date(this.semestreInicio),
      new Date(this.semestreFin),
      [
        {
          inicio: new Date(this.vacacionesSemestreInicio),
          fin: new Date(this.vacacionesSemestreFin)
        }
      ]
    );

    // Crear estudiante con semestre
    const nuevo = new Estudiante(
      undefined,
      this.nombre,
      this.avatar,
      [], // materias vacías al inicio
      [], // recordatorios vacíos al inicio
      semestre
    );

    this.estSrv.setEstudiante(nuevo);
    this.estSrv.markOnboardingComplete();

    // Guardar en localStorage
    const usuario = {
      nombre: this.nombre,
      avatar: this.avatar,
      semestre: {
        idSemestre: semestre.idSemestre,
        nombre: semestre.nombre,
        fechaInicio: semestre.fechaInicio,
        fechaFin: semestre.fechaFin,
        vacaciones: semestre.vacaciones
      }
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('usuarioConfigurado', 'true');

    this.router.navigateByUrl('/tabs/calendar-and-tasks', { replaceUrl: true });
  }


  selectAvatar(filename: string) {
    this.avatar = filename; // solo se guarda el nombre
  }

  getAvatarUrl(filename?: string) {
    return this.avatarSrv.getAvatarUrl(filename);
  }

}
