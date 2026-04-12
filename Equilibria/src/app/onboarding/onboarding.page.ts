import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { EstudianteService } from '../services/EstudianteService';
import { Estudiante } from '../models/estudiante';
import { AvatarService } from '../services/avatar.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, CommonModule, FormsModule]
})
export class OnboardingPage implements OnInit {

  nombre: string = '';
  avatar: string = '';

  avatarFiles: { filename: string; url: string }[] = [];

  constructor(
    private router: Router,
    private estSrv: EstudianteService,
    private avatarSrv: AvatarService
  ) {}

  ngOnInit() {
    this.avatarFiles = this.avatarSrv.getAvatarObjects();
  }

  completar() {
    // Crear estudiante en memoria usando el generador de id (pasar undefined para generar id automático)
    const nuevo = new Estudiante(undefined, this.nombre, this.avatar);
    this.estSrv.setEstudiante(nuevo);
    // marcar onboarding completado en memoria
    this.estSrv.markOnboardingComplete();
    // registrar resumen público simulado
    this.estSrv.addLocalStudentSummary(nuevo.getSummary());
    // navegar a la página principal (calendar-and-tasks)
    this.router.navigateByUrl('/tabs/calendar-and-tasks', { replaceUrl: true });
  }

  selectAvatar(filename: string) {
    this.avatar = filename; // solo se guarda el nombre
  }

  getAvatarUrl(filename?: string) {
    return this.avatarSrv.getAvatarUrl(filename);
  }

}
