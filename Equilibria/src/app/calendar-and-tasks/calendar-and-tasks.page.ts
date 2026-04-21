import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockService } from '../services/MockService';
import { Materia } from '../models/materia';
import { MateriaService } from '../services/MateriaService';
import { Tarea } from '../models/tarea';
import { TareaService } from '../services/TareaService';
import { HorarioEnriquecido } from '../models/horario-enriquecido';
import
{
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonCheckbox,
  IonNote,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-calendar-and-tasks',
  templateUrl: './calendar-and-tasks.page.html',
  styleUrls: ['./calendar-and-tasks.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonSegment, IonSegmentButton, IonLabel,
    IonGrid, IonRow, IonCol,
    IonList, IonItem, IonCheckbox, IonNote,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    CommonModule
  ]
})
export class CalendarAndTasksPage implements OnInit {

  materias: Materia[] = [];
  tareasPendientes: Tarea[] = [];
  horarios: HorarioEnriquecido[] = [];

  constructor(private mockData: MockService, private tareaService: TareaService) { }

  ngOnInit(): void {
    this.materias = this.mockData.getMaterias();
    this.horarios = this.materias.flatMap(materia =>
      materia.horarios.map(horario => ({
        dia: horario.dia,
        horaInicio: horario.horaInicio,
        duracionHoras: horario.duracionHoras,
        salon: horario.salon,
        materiaColor: materia.color,
        materiaNombre: materia.nombre,
        materiaSalon: horario.salon ?? null
      }))
    );

    this.tareasPendientes = this.materias.flatMap(materia => materia.tareas.filter(t => !t.estado));

  }
  segmentValue: string = 'horario';

  horas: number[] = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];


  getMateriaDeTarea(idMateria: number): Materia | undefined {
    return this.materias.find(m => m.idMateria === idMateria);
  }

  getHorario(dia: number, hora: number) {
    return this.horarios.find(h =>
      h.dia === dia &&
      hora >= h.horaInicio &&
      hora < h.horaInicio + h.duracionHoras
    );
  }


}

