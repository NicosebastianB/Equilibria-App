import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'calendar-and-tasks',
    loadComponent: () => import('./calendar-and-tasks/calendar-and-tasks.page').then( m => m.CalendarAndTasksPage)
  },
  {
    path: 'materias',
    loadComponent: () => import('./materias/materias.page').then( m => m.MateriasPage)
  },
  {
    path: 'student-subject/:idMateria',
    loadComponent: () => import('./student-subject/student-subject.page').then(m => m.StudentSubjectPage)
  },
  {
    path: 'student-subject',
    loadComponent: () => import('./student-subject/student-subject.page').then( m => m.StudentSubjectPage)
  },
  {
    path: 'estadisticas',
    loadComponent: () => import('./estadisticas/estadisticas.page').then( m => m.EstadisticasPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'bienestar',
    loadComponent: () => import('./bienestar/bienestar.page').then( m => m.BienestarPage)
  },
  {
    path: 'modo-estudio',
    loadComponent: () => import('./modo-estudio/modo-estudio.page').then( m => m.ModoEstudioPage)
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./onboarding/onboarding.page').then( m => m.OnboardingPage)
  },
];
