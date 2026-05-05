import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { DataService } from '../app/services/data';
import { MockService } from '../app/services/MockService';

import {
  book,
  calendar,
  folderOpen,
  statsChart,
  settings,
  roseSharp,
  settingsSharp,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { EstudianteService } from './services/EstudianteService';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],

})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private estSrv: EstudianteService,
    private dataService: DataService,
    private mockService: MockService
  ) {
    addIcons({
      book,
      calendar,
      folderOpen,
      statsChart,
      settings,
      roseSharp,
      settingsSharp,
    });
  }

  ngOnInit() {
    // 🔑 cargar datos desde localStorage
    this.dataService.cargarDatos();

    // Si no hay materias en localStorage, poblar con mock
    if (this.dataService.getMaterias().length === 0) {
      const mockMaterias = this.mockService.getMaterias();
      mockMaterias.forEach(m => this.dataService.addMateria(m));
    }

    const usuarioConfigurado = localStorage.getItem('usuarioConfigurado');
    if (usuarioConfigurado === 'true') {
      this.router.navigateByUrl('/tabs/materias', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/onboarding', { replaceUrl: true });
    }
  }

  private initialize() {
    this.dataService.cargarDatos(); // 🔑 ahora sí se ejecuta siempre

    if (this.dataService.getMaterias().length === 0) {
      const mockMaterias = this.mockService.getMaterias();
      mockMaterias.forEach(m => this.dataService.addMateria(m));
    }

    const usuarioConfigurado = localStorage.getItem('usuarioConfigurado');
    if (usuarioConfigurado === 'true') {
      this.router.navigateByUrl('/tabs/materias', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/onboarding', { replaceUrl: true });
    }
  }

}
