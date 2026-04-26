
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { Horario } from '../models/horario';
import { Materia } from '../models/materia';
import { Semestre } from '../models/semestre';
import { MockService } from '../services/MockService';
import { EstudianteService } from '../services/EstudianteService';
import { MateriaService } from '../services/MateriaService';
import { RouterModule } from '@angular/router';
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
  IonCardHeader,
  IonCardContent,
  IonNote
} from '@ionic/angular/standalone';
import { add, close, trash, settingsSharp, roseSharp, pencil } from 'ionicons/icons';
import { DataService } from '../services/data';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
  standalone: true,
  imports: [
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
    IonCardHeader,
    IonCardContent,
    IonNote
  ]

})
export class MateriasPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;


  message = '';
  materias: Materia[] = [];
  tiempoDedicadoPorMateria: { [nombre: string]: number } = {};
  cumplimientoSemanal: { [nombre: string]: number } = {};

  // Modo del modal: crear o editar
  modoEditar: boolean = false;

  // Materia en creación/edición
  materia: Materia = new Materia(
    Date.now(),
    '',
    '',
    null,   // créditos
    '',
    null    // horasClaseSemanal
  );


  // Horarios asociados a la materia actual
  horarios: Horario[] = [];
  popoverOpen = false;

  // Horario temporal para el formulario
  nuevoHorario: any = {
    dia: 1,
    horaInicio: 8,  // Cambiar a number para horas 0-23
    duracionHoras: 1,
    salon: ''
  };

  // Variables separadas para el binding en el popover
  diaSeleccionado: number = 1;
  horaSeleccionada: number = 8;  // Cambiar a number
  duracionSeleccionada: number = 1;
  salonSeleccionado: string = '';

  diasSemana: string[] = [
    '', // índice 0 vacío para que coincida con tu modelo (1=Lunes)
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];

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

  nuevaTarea: string = '';
  materiaSeleccionada: number | null = null;

  horasConfirmadas: boolean = false;

  constructor(
    private dataService: DataService,
    private mockService: MockService,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService
  ) {
    addIcons({ settingsSharp, roseSharp, add, pencil, trash, close });
  }

  ngOnInit() {
    this.materias = this.dataService.getMaterias();
    if (this.materias.length === 0) {
      const mockMaterias = this.mockService.getMaterias();
      mockMaterias.forEach(m => this.dataService.addMateria(m));
      this.materias = this.dataService.getMaterias();
    }

    // 🔑 Asignar registros a cada materia
    this.materias.forEach(m => {
      console.log(`Materia ${m.nombre} (${m.idMateria}) tiene calificables:`,
        m.cortes.flatMap(c => c.actividades.flatMap(a => a.calificables)));
    });


    this.loadDedicacion();
  }

  // Función que valida si un nuevo bloque horario choca con cualquier otro bloque
  private validarChoqueGlobal(
    materias: Materia[],
    idMateriaActual: number,
    nuevoDia: number,
    nuevoInicio: number,
    nuevaDuracion: number
  ): boolean {
    const nuevoFin = nuevoInicio + nuevaDuracion;

    console.log(`Validando choque global: Día ${nuevoDia}, Inicio ${nuevoInicio}, Fin ${nuevoFin}`);

    for (const materia of materias) {
      for (const h of materia.horarios) {
        const hFin = h.horaInicio + h.duracionHoras;

        // Evitar comparar contra la misma materia si estamos editando
        if (materia.idMateria === idMateriaActual) continue;

        if (h.dia === nuevoDia) {
          if (nuevoInicio < hFin && nuevoFin > h.horaInicio) {
            console.log(`⚠️ Choque detectado con materia ${materia.nombre}`);
            return true;
          }
        }
      }
    }

    console.log('✅ No hay choques globales');
    return false;
  }

  // Función para resetear el estado del modal
  resetMateria() {
    this.materia = new Materia(
      Date.now(),
      '',
      '',
      null,
      '',
      null
    );
    this.horarios = [];
    this.horasConfirmadas = false;
    this.modoEditar = false;
  }

  // Abrir modal para crear nueva materia
  abrirModalCrear() {
    this.resetMateria();
    this.modal.present();
  }

  // Abrir modal para editar materia existente
  editarMateria(materiaExistente: Materia) {
    this.modoEditar = true;
    // Asignar propiedades de la materia existente
    this.materia.idMateria = materiaExistente.idMateria;
    this.materia.nombre = materiaExistente.nombre;
    this.materia.profesor = materiaExistente.profesor;
    this.materia.creditos = materiaExistente.creditos;
    this.materia.color = materiaExistente.color;
    this.materia.horasClaseSemanal = materiaExistente.horasClaseSemanal;
    this.horarios = [...materiaExistente.horarios]; // Copiar horarios
    this.horasConfirmadas = true; // Asumir que ya están confirmadas para edición
    this.modal.present();
  }



  //todo esto de aqui para abajo hasta el comentario final solo se encarga de gestionar la creacion de la materia y sus horarios, validando que el usuario no pueda cometer errores al ingresar la información. No se guarda nada en memoria ni en base de datos, solo se construye el objeto `materia` con su arreglo de `horarios` y se devuelve al cerrar el modal. El DataService se encargará de persistirlo cuando reciba ese objeto.

  abrirPopover(ev: any) {
    // Inicializar las variables del popover con los valores actuales
    this.diaSeleccionado = this.nuevoHorario.dia;
    this.horaSeleccionada = this.nuevoHorario.horaInicio;
    this.duracionSeleccionada = this.nuevoHorario.duracionHoras;
    this.salonSeleccionado = this.nuevoHorario.salon;
    this.popoverOpen = true;
  }

  actualizarHoras(event: any) {
    const valor = event.target?.value;
    this.materia.horasClaseSemanal = Number(valor);
  }

  confirmarHoras() {

    const horasClase = this.materia.horasClaseSemanal;
    if (horasClase == null || isNaN(horasClase) || horasClase <= 0) {
      alert('Debes ingresar un número válido de horas semanales.');
      this.horasConfirmadas = false;
      return;
    }

    this.horasConfirmadas = true;
  }

  agregarHorario() {
    const horasClase = Number(this.materia.horasClaseSemanal ?? 0);
    const duracion = Number(this.nuevoHorario.duracionHoras ?? 0);

    if (horasClase <= 0) {
      alert('Debes ingresar las horas semanales de la materia antes de agregar horarios.');
      return;
    }

    if (duracion <= 0) {
      alert('Debes ingresar una duración válida para el bloque.');
      return;
    }

    const totalHoras = this.horarios.reduce((sum, h) => sum + h.duracionHoras, 0);
    if (totalHoras + duracion > horasClase) {
      alert('No puedes exceder las horas semanales de la materia');
      return;
    }

    const horaInicioNum = this.horaSeleccionada;

    // ✅ Usar la función de validación
    const hayChoqueGlobal = this.validarChoqueGlobal(
      this.materias,
      this.materia.idMateria,
      this.nuevoHorario.dia,
      horaInicioNum,
      duracion
    );

    if (hayChoqueGlobal) {
      alert('El bloque horario choca con otra materia existente.');
      return;
    }

    const horario = new Horario(
      Date.now(),
      this.materia.idMateria,
      Number(this.nuevoHorario.dia),
      horaInicioNum,
      duracion,
      this.nuevoHorario.salon || undefined
    );

    this.horarios.push(horario);
    this.popoverOpen = false;

    this.nuevoHorario = {
      dia: 1,
      horaInicio: 8,
      duracionHoras: 1,
      salon: ''
    };
  }



  eliminarHorario(id: number) {
    this.horarios = this.horarios.filter(h => h.id !== id);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const horasClase = Number(this.materia.horasClaseSemanal ?? 0);

    // Validar campos obligatorios
    if (!this.materia.nombre || !this.materia.color || this.materia.creditos == null || this.materia.creditos <= 0 || horasClase <= 0) {
      alert('Debes llenar todos los campos obligatorios de la materia.');
      return;
    }

    // ✅ Validar nombre duplicado
    const nombreExiste = this.materias.some(m =>
      m.nombre.trim().toLowerCase() === this.materia.nombre.trim().toLowerCase() &&
      m.idMateria !== this.materia.idMateria // permitir el mismo en edición
    );

    if (nombreExiste) {
      alert('Ya existe una materia con ese nombre.');
      return;
    }

    // Validar que exista al menos un bloque horario
    if (this.horarios.length === 0) {
      alert('Debes agregar al menos un bloque horario.');
      return;
    }

    // Calcular total de horas de los bloques
    const totalHoras = this.horarios.reduce((sum, h) => sum + Number(h.duracionHoras), 0);

    // Validar que no exceda las horas semanales
    if (totalHoras > horasClase) {
      alert('Los bloques horarios exceden las horas semanales permitidas.');
      return;
    }

    // Guardar horarios en la materia
    this.materia.horarios = this.horarios;

    if (this.modoEditar) {
      this.dataService.updateMateria(this.materia);
      this.materias = this.dataService.getMaterias();
      this.loadDedicacion();
      this.modal.dismiss();
    } else {
      this.modal.dismiss(this.materia, 'confirm');
    }

    this.resetMateria();
  }


  public onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm' && !this.modoEditar) {
      // Solo agregar nueva materia si no es edición
      this.dataService.addMateria(event.detail.data);
      this.materias = this.dataService.getMaterias();
      this.loadDedicacion();
      this.message = `Materia agregada: ${event.detail.data.nombre}`;
    }
  }

  //a partir de este comentario hasta el final se encarga de gestionar la lista de materias guardadas en el mock data, permitiendo editar la materia (lo que basicamente solo abre la pagina dedicada a la materia y toda su informacion). Esto es para verificar que el flujo de navegación entre paginas funciona correctamente, y que la informacion de cada materia se muestra correctamente en su pagina dedicada.

  private loadDedicacion() {
    const estudiante = this.mockService.getEstudiante();
    if (!estudiante) return;

    this.estudianteService.setEstudiante(estudiante);
    const proporciones = this.estudianteService.calcularProporcionEstudio();
    this.tiempoDedicadoPorMateria = {};

    const semestre = this.mockService.getSemestre();
    this.cumplimientoSemanal = {};

    this.materias.forEach(materia => {
      materia.calcularHorasTrabajo(semestre);

      // ✅ usar idMateria como clave en ambos diccionarios
      this.tiempoDedicadoPorMateria[materia.idMateria] = proporciones[materia.idMateria] ?? 0;
      this.cumplimientoSemanal[materia.idMateria] = this.materiaService.obtenerCumplimientoSemanal(materia, semestre);
    });
  }



  getColorHex(colorName: string): string {
    const found = this.colores.find(c => c.value === colorName);
    return found ? found.hex : colorName || '#c8c8c8';
  }

  obtenerDedicacion(idMateria: number): string {
    const valor = this.tiempoDedicadoPorMateria[idMateria];
    return valor > 0 ? `${valor.toFixed(0)}%` : '';
  }

  obtenerCumplimientoSemanal(idMateria: number): string {
    const valor = this.cumplimientoSemanal[idMateria];

    return valor > 0 ? `${valor.toFixed(0)}%` : '';
  }

  obtenerUltimaNotaMateria(idMateria: number): string {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (!materia) return '';

    const ultimoCalif = materia.obtenerUltimoCalificable();
    if (!ultimoCalif) return 'Sin calificaciones';

    return `${ultimoCalif.nombre}: ${ultimoCalif.nota?.toFixed(1) ?? 'N/A'}`;
  }


}
