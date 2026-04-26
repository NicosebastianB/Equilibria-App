import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Materia } from '../models/materia';
import { Actividad } from '../models/actividad';
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../services/data';
import { addIcons } from 'ionicons'; 
import { add, close, trash, settingsSharp, roseSharp, pencil } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
  IonList,
  IonItem,
  IonModal,
  IonChip,
  IonSelect,
  IonSelectOption,
  IonPopover,
  IonInput,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonNote,
  IonProgressBar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-student-subject',
  templateUrl: './student-subject.page.html',
  styleUrls: ['./student-subject.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonLabel,
    IonList,
    IonItem,
    IonModal,
    IonChip,
    IonSelect,
    IonSelectOption,
    IonPopover,
    IonInput,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonNote,
    IonProgressBar
  ]
})
export class StudentSubjectPage implements OnInit {
  materia!: Materia;
  actividad: Actividad[] = [];
  constructor(private route: ActivatedRoute, private dataService: DataService) {
    addIcons({ settingsSharp, roseSharp, add, pencil, trash, close });
  }

  ngOnInit() {
    const idMateria = Number(this.route.snapshot.paramMap.get('idMateria'));
    this.materia = this.dataService.getMaterias().find(m => m.idMateria === idMateria)!;
  }

  editarMateria(Materia: Materia) {
    //do nothing for now
  }

  modificarCriterios(Materia: Materia) {
    //do nothing for now
  }

  agregarTarea(idMateria: number) {
    //do nothing for now
  }

  agregarActividad(idMateria: number) {
    //do nothing for now
  }




}
