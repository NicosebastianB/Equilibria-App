import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Materia } from '../models/materia';
import { DataService } from '../services/data';
import { MockService } from '../services/MockService';
import { EstudianteService } from '../services/EstudianteService';
import { MateriaService } from '../services/MateriaService';
import { DecimalPipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart, registerables, ChartType, ChartData, ChartOptions} from 'chart.js';
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
  IonNote
} from '@ionic/angular/standalone';


Chart.register(...registerables);

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports:
    [
      RouterModule,
      DecimalPipe,
      CommonModule,
      FormsModule,
      RouterModule,
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
      NgChartsModule
    ]
})
export class EstadisticasPage implements OnInit {

  materiasActivas: Materia[] = [];
  proporciones: { [idMateria: number]: number } = {};
  cumplimientoSemanal: { [idMateria: number]: number } = {};

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

  private getHexColor(nombreColor: string): string {
    const encontrado = this.colores.find(c => c.value === nombreColor);
    return encontrado ? encontrado.hex : '#cccccc'; // fallback gris
  }


  //bar chart data, gráfico de barras

  public barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    }
  };

  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Definitiva parcial' }
    ]
  };

  //pie chart data, grafico de torta

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true }
    }
  };

  public pieChartType: 'pie' = 'pie';

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: []
      }
    ]
  };

  //line chart data, grafico de lineas

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => value + '%'
        }
      }
    }
  };

  public lineChartType: 'line' = 'line';

  public lineChartData: ChartData<'line'> = {
    labels: [], // semanas
    datasets: []
  };

  modalSimuladorOpen = false;
  materiaSeleccionada: number | null = null;
  cortesSeleccionados: number[] = [];
  resultadoSimulador: string = '';

  constructor(
    private dataService: DataService,
    private mockService: MockService,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService
  ) { }

  ngOnInit() {
    this.materiasActivas = this.dataService.getMateriasActivas();

    const estudiante = this.mockService.getEstudiante();
    const semestre = this.mockService.getSemestre();
    this.estudianteService.setEstudiante(estudiante);

    this.proporciones = this.estudianteService.calcularProporcionEstudio();
    this.materiasActivas.forEach(m => {
      this.cumplimientoSemanal[m.idMateria] = this.materiaService.obtenerCumplimientoSemanal(m, semestre);
    });

    // 🔑 Llenar datos del gráfico con definitivas parciales
    this.barChartData = {
      labels: this.materiasActivas.map(m => m.nombre),
      datasets: [
        {
          data: this.materiasActivas.map(m => m.definitiva ?? 0),
          label: 'Definitiva parcial',
          backgroundColor: this.materiasActivas.map(m => this.getHexColor(m.color))
        }
      ]
    };

  }

  abrirModalSimulador() {
    this.modalSimuladorOpen = true;
  }

  cerrarModalSimulador() {
    this.modalSimuladorOpen = false;
  }

  // 🔑 Ahora acepta number | null
  getCortesMateria(idMateria: number | null) {
    if (idMateria === null) return [];
    const materia = this.materiasActivas.find(m => m.idMateria === idMateria);
    return materia ? materia.cortes : [];
  }

  calcularNotaNecesaria() {
    const materia = this.materiasActivas.find(m => m.idMateria === this.materiaSeleccionada);
    if (!materia) return;

    let acumulado = 0;
    let porcentajeSeleccionado = 0;

      this.cortesSeleccionados.forEach(idCorte => {
        const corte = materia.cortes.find(c => c.idCorte === idCorte);
        if (corte) {
          acumulado += (corte.notaDefinitiva ?? 0) * (corte.porcentaje / 100);
          porcentajeSeleccionado += corte.porcentaje;
        }
      });

    const notaNecesaria = ((3.0 - acumulado) / (100 - porcentajeSeleccionado)) * 100;
    this.resultadoSimulador = `Necesitas aproximadamente ${notaNecesaria.toFixed(2)} en los cortes restantes para alcanzar 3.0.`;
  }

  ionViewWillEnter() {
    this.materiasActivas = this.dataService.getMateriasActivas();

    const estudiante = this.mockService.getEstudiante();
    const semestre = this.mockService.getSemestre();
    this.estudianteService.setEstudiante(estudiante);

    this.proporciones = this.estudianteService.calcularProporcionEstudio();

    // 🔄 Recalcular definitivas y cumplimiento semanal
    this.materiasActivas.forEach(m => {
      // recalcula horas y definitivas
      m.calcularHorasTrabajo(semestre);
      m.calcularDefinitiva(); // asegúrate de tener este método en Materia

      this.cumplimientoSemanal[m.idMateria] =
        this.materiaService.obtenerCumplimientoSemanal(m, semestre);
    });

    // 🔄 Gráfico de barras
    this.barChartData = {
      labels: this.materiasActivas.map(m => m.nombre),
      datasets: [
        {
          data: this.materiasActivas.map(m => m.definitiva ?? 0),
          label: 'Definitiva parcial',
          backgroundColor: this.materiasActivas.map(m => this.getHexColor(m.color))
        }
      ]
    };

    // 🔄 Gráfico de pastel
    this.pieChartData = {
      labels: this.materiasActivas.map(m => m.nombre),
      datasets: [
        {
          data: this.materiasActivas.map(m => this.proporciones[m.idMateria] ?? 0),
          backgroundColor: this.materiasActivas.map(m => this.getHexColor(m.color))
        }
      ]
    };

    // 🔄 Gráfico de líneas
    const totalSemanas = semestre.calcularSemanasTotales();
    const semanas = Array.from({ length: totalSemanas }, (_, i) => `Semana ${i + 1}`);
    this.lineChartData.labels = semanas;
    this.lineChartData.datasets = this.materiasActivas.map(m => ({
      label: m.nombre,
      data: semanas.map((_, i) =>
        this.materiaService.obtenerCumplimientoSemanalPorSemana(m, semestre, i + 1)
      ),
      borderColor: this.getHexColor(m.color),
      backgroundColor: this.getHexColor(m.color),
      fill: false,
      tension: 0.2
    }));
  }


}
