import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
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
export class AppComponent {
  constructor(
    private router: Router,
    private estSrv: EstudianteService,
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
    this.initialize();
  }

  private initialize() {
    const usuarioConfigurado = localStorage.getItem('usuarioConfigurado');

    if (usuarioConfigurado === 'true') {
      this.router.navigateByUrl('/tabs/materias', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/onboarding', { replaceUrl: true });
    }
  }
}
