import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DataService } from '../services/data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, FormsModule],
})
export class MateriasPage implements OnInit {
  constructor(private dataService: DataService) {}

  materias: any[] = [];
  tareas: any[] = [];

  nuevaTarea: string = '';
  materiaSeleccionada: number | null = null;

  agregarTarea() {
    if (!this.nuevaTarea || !this.materiaSeleccionada) return;

    const nueva = {
      id: Date.now(),
      titulo: this.nuevaTarea,
      materiaId: this.materiaSeleccionada,
    };

    this.dataService.addTarea(nueva);

    this.tareas = this.dataService.getTareas();

    this.nuevaTarea = '';
    this.materiaSeleccionada = null;
  }

  eliminarTarea(id: number) {
    this.dataService.eliminarTarea(id);
    this.tareas = this.dataService.getTareas();
  }

  ngOnInit() {
    this.materias = this.dataService.getMaterias();
    this.tareas = this.dataService.getTareas();
  }
}
