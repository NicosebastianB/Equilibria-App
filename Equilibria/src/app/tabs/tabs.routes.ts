import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'calendar-and-tasks',
        loadComponent: () => import('../calendar-and-tasks/calendar-and-tasks.page').then(m => m.CalendarAndTasksPage),
      },
      {
        path: 'materias',
        loadComponent: () => import('../materias/materias.page').then(m => m.MateriasPage),
      },
      {
        path: 'estadisticas',
        loadComponent: () => import('../estadisticas/estadisticas.page').then(m => m.EstadisticasPage),
      },
      {
        path: 'modo-estudio',
        loadComponent: () => import('../modo-estudio/modo-estudio.page').then(m => m.ModoEstudioPage),
      },
      {
        path: '',
        redirectTo: '/tabs/calendar-and-tasks',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/calendar-and-tasks',
    pathMatch: 'full',
  },
];
