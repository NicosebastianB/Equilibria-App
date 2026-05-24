import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonDatetime, IonModal, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, calendarClearOutline } from 'ionicons/icons';
import {
  IonContent,
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
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonDatetime,
    IonModal,
    IonIcon,
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

    const inicio = this.parseLocalDate(this.semestreInicio);
    const fin = this.parseLocalDate(this.semestreFin);
    const vacInicio = this.parseLocalDate(this.vacacionesSemestreInicio);
    const vacFin = this.parseLocalDate(this.vacacionesSemestreFin);

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



  private parseLocalDate(value: string | Date): Date {
    if (typeof value === 'string') {
      const match = /^([0-9]{4})-([0-9]{2})-([0-9]{2})/.exec(value);
      if (match) {
        return new Date(+match[1], +match[2] - 1, +match[3]);
      }
      const parsed = new Date(value);
      return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
    }

    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  ngOnInit() {
    this.avatarFiles = this.avatarSrv.getAvatarObjects();
  }

  completar() {
    // Crear objeto Semestre
    const semestre = new Semestre(
      Date.now(), // idSemestre simple, puedes cambiarlo por un generador
      'Semestre',
      this.parseLocalDate(this.semestreInicio)!,
      this.parseLocalDate(this.semestreFin)!,
      [
        {
          inicio: this.parseLocalDate(this.vacacionesSemestreInicio)!,
          fin: this.parseLocalDate(this.vacacionesSemestreFin)!
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
        fechaInicio: this.semestreInicio,
        fechaFin: this.semestreFin,
        vacaciones: [
          { inicio: this.vacacionesSemestreInicio, fin: this.vacacionesSemestreFin }
        ]
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
