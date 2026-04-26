import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Materia } from '../models/materia';
import { Tarea } from '../models/tarea';
import { HorarioEnriquecido } from '../models/horario-enriquecido';
import { DataService } from '../services/data'; 
import
{
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
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
    IonContent, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonButton, IonIcon, 
    IonLabel, IonGrid, IonRow, IonCol,
    IonList, IonItem, IonCheckbox, IonNote,
    IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, CommonModule
  ]
})
export class CalendarAndTasksPage implements OnInit {

  materias: Materia[] = [];
  tareasPendientes: Tarea[] = [];
  tareasCompletadas: Tarea[] = [];
  horarios: HorarioEnriquecido[] = [];

  colores = [
    { value: 'amarillo', hex: '#fbf8cc' },
    { value: 'durazno', hex: '#fde4cf' },
    { value: 'naranja', hex: '#ffcfd2' },
    { value: 'rosa', hex: '#f1c0e8' },
    { value: 'morado', hex: '#cfbaf0' },
    { value: 'violeta', hex: '#a3c4f3' },
    { value: 'azul', hex: '#90dbf4' },
    { value: 'cian', hex: '#8eecf5' },
    { value: 'aguamarina', hex: '#98f5e1' },
    { value: 'verde', hex: '#b9fbc0' }
  ];

  constructor
    (
    private dataService: DataService,
  )
  { }

  ngOnInit(): void {
    // Inicializar materias desde DataService
    this.materias = this.dataService.getMaterias();

    // Inicializar tareas directamente desde las materias
    const tareas = this.dataService.getTareas();
    this.refrescarTareas();

    // Construir horarios iniciales
    this.horarios = this.materias.flatMap(materia =>
      materia.horarios.map(horario => ({
        dia: horario.dia,
        horaInicio: horario.horaInicio,
        duracionHoras: horario.duracionHoras,
        salon: horario.salon,
        materiaColor: this.getColorHex(materia.color), // 👈 aquí el hex
        materiaNombre: materia.nombre,
        materiaSalon: horario.salon ?? null
      }))
    );
  }

  segmentValue: string = 'horario';

  horas: number[] = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  getMateriaDeTarea(idMateria: number): Materia | undefined {
    return this.materias.find(m => m.idMateria === idMateria);
  }

  private refrescarTareas() {
    const todas = this.dataService.getTareas();
    this.tareasPendientes = todas.filter(t => !t.estado);
    this.tareasCompletadas = todas.filter(t => t.estado);
  }

  onTareaCompletada(tarea: Tarea) {
    this.dataService.marcarTareaComoCompletada(tarea.idMateria, tarea.idTarea);
    this.refrescarTareas();
  }

  onRevertirTarea(tarea: Tarea) {
    this.dataService.marcarTareaComoPendiente(tarea.idMateria, tarea.idTarea);
    this.refrescarTareas();
  }


  trackByTarea(index: number, tarea: Tarea) {
    return tarea.idTarea;
  }



  getHorario(dia: number, hora: number) {
    return this.horarios.find(h =>
      h.dia === dia &&
      hora >= h.horaInicio &&
      hora < h.horaInicio + h.duracionHoras
    );
  }

  getColorHex(nombreColor: string): string {
    const color = this.colores.find(c => c.value === nombreColor);
    return color ? color.hex : '#ffffff'; // blanco por defecto si no encuentra
  }


  ionViewWillEnter() {
    // Refrescar materias y tareas al entrar en la página
    this.materias = this.dataService.getMaterias();

    const tareas = this.dataService.getTareas();
    this.tareasPendientes = tareas.filter(t => !t.estado);
    this.tareasCompletadas = tareas.filter(t => t.estado);

    // Reconstruir horarios
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
  }





}

