import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'student-subject/:idMateria',
    loadComponent: () => import('./student-subject/student-subject.page').then(m => m.StudentSubjectPage)
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./onboarding/onboarding.page').then(m => m.OnboardingPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'bienestar',
    loadComponent: () => import('./bienestar/bienestar.page').then(m => m.BienestarPage)
  }
];
