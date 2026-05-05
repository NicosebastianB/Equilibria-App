import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { Materia } from '../models/materia';
import { Corte } from '../models/corte';
import { Actividad } from '../models/actividad';
import { Tarea } from '../models/tarea';
import { Calificable } from '../models/calificable'
import { MockService } from '../services/MockService';
import { EstudianteService } from '../services/EstudianteService';
import { MateriaService } from '../services/MateriaService';
import { CorteService } from '../services/CorteService';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { ToastController } from '@ionic/angular';

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
  IonBackButton,
  IonAccordion,
  IonAccordionGroup,
  IonText,
  IonCheckbox,
  IonProgressBar
} from '@ionic/angular/standalone';
import
{
  add,
  close,
  trash,
  settingsSharp,
  roseSharp,
  pencil,
  ellipsisVertical,
  arrowBackOutline,
  addCircleOutline
} from 'ionicons/icons';
import { DataService } from '../services/data';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-student-subject',
  templateUrl: './student-subject.page.html',
  styleUrls: ['./student-subject.page.scss'],
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
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonNote,
    IonBackButton,
    IonAccordion,
    IonAccordionGroup,
    IonText,
    IonCheckbox,
    IonProgressBar
  ]

})


export class StudentSubjectPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  materia!: Materia;

  modalCriteriosOpen = false;
  popoverOpenCorte = false;
  popoverOpenActividad = false;
  corteSeleccionado!: Corte;

  modalCalificableOpen = false;
  calificableSeleccionado: Calificable | null = null;
  formCalificable: any =
    {
      nombre: '',
      nota: null,
      fecha: new Date(),
      idActividad: null
    };


  tareas: Tarea[] = [];
  tareasPendientes: Tarea[] = [];
  tareasCompletadas: Tarea[] = [];
  tareaSeleccionada: Tarea | null = null;
  modalTareaOpen = false;
  formTarea: any = { nombre: '', fecha: new Date(), tipoRecordatorio: 'once' };

  //nombre del corte y porcentaje
  nombreCorte: string = '';
  porcentajeCorte: number = 0;

  //nombre de la actividad y porcentaje
  nombreActividad: string = '';
  porcentajeActividad: number = 0;

  //corte editado temporal
  nuevoCorte: any = {
    nombre: '',
    porcentaje: 0
  };

  nuevaActividad: any ={
    nombre: '',
    porcentaje : 0
  }


  tiempoDedicadoPorMateria: { [nombre: string]: number } = {};
  cumplimientoSemanal: { [nombre: string]: number } = {};

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

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private mockService: MockService,
    private estudianteService: EstudianteService,
    private materiaService: MateriaService,
    private corteService: CorteService,
    private toastController: ToastController
  ) {
    addIcons(
      {
        settingsSharp,
        roseSharp,
        add,
        pencil,
        trash,
        close,
        ellipsisVertical,
        arrowBackOutline,
        addCircleOutline
      });
  }

  ngOnInit() {
    const idMateria = Number(this.route.snapshot.paramMap.get('idMateria'));
    this.materia = this.dataService.getMaterias().find(m => m.idMateria === idMateria)!;


    // 🔑 sincronizar con MateriaService
    this.materiaService.setMaterias(this.dataService.getMaterias());
    console.log("Materia cargada en la página:", this.materia);
    console.log("Cortes y calificables:", this.materia.cortes.map(c => c.actividades.map(a => a.calificables)));

  }

  ionViewWillEnter() {
    // Filtrar tareas de la materia actual
    const todas = this.dataService.getTareas().filter(t => t.idMateria === this.materia.idMateria);
    this.tareasPendientes = todas.filter(t => !t.estado);
    this.tareasCompletadas = todas.filter(t => t.estado);
  }

  toggleFinalizado() {
    this.materia.finalizado = !this.materia.finalizado;
    this.dataService.updateMateria(this.materia);
    const mensaje = this.materia.finalizado
      ? "Materia marcada como completada."
      : "Materia marcada como activa nuevamente.";
    this.mostrarToast(mensaje, "success");
  }

  async confirmarEliminarMateria() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Confirmar eliminación';
    alert.message = '¿Estás seguro de que deseas eliminar esta materia? Esta acción borrará todo su contenido y no se puede deshacer.';
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          this.dataService.eliminarMateria(this.materia.idMateria);
          this.mostrarToast("Materia eliminada correctamente.", "danger");
          // Redirigir a la lista de materias
          window.location.href = '/materias';
        }
      }
    ];
    document.body.appendChild(alert);
    await alert.present();
  }

  getProgresoMateria(materia: Materia): number {
    const horasIndependientes = materia.horasIndependientes;
    const horasTotales = materia.horasTotales;
    const horasPresenciales = materia.horasPresenciales;
    const horasAcumuladas = materia.calcularHorasAcumuladas();

    const progreso = horasIndependientes > 0 ? (horasAcumuladas / horasIndependientes) * 100 : 0;

    return Math.min(progreso, 100);
  }

  getFeedbackProgreso(materia: Materia) {
    const progreso = this.getProgresoMateria(materia);

    let color = 'danger';
    let mensaje = '';

    if (progreso < 10) {
      color = 'danger';
      mensaje = 'Vas empezando, sigue estudiando.';
    } else if (progreso < 25) {
      color = 'warning';
      mensaje = 'Mantén tu ritmo de estudio.';
    } else if (progreso < 50) {
      color = 'tertiary';
      mensaje = 'Cada vez avanzas más en tu estudio.';
    } else if (progreso < 75) {
      color = 'primary';
      mensaje = 'Ya vas más de la mitad, ¡ánimo!';
    } else if (progreso < 90) {
      color = 'success';
      mensaje = 'Estás a punto de terminar, no aflojes.';
    } else if (progreso < 100) {
      color = 'success';
      mensaje = 'Recta final, ¡muy cerca de lograrlo!';
    } else {
      color = 'success';
      mensaje = '¡Felicitaciones! Has completado tu estudio.';
    }

    return { color, mensaje };
  }




  trackByTarea(index: number, tarea: Tarea) {
    return tarea.idTarea;
  }

  onTareaCompletada(tarea: Tarea) {
    console.log("Marcando tarea como completada:", tarea.idTarea, "de materia:", tarea.idMateria);
    this.dataService.marcarTareaComoCompletada(tarea.idMateria, tarea.idTarea);
    this.refrescarTareas();
  }

  onRevertirTarea(tarea: Tarea) {
    console.log("Revirtiendo tarea a pendiente:", tarea.idTarea, "de materia:", tarea.idMateria);
    this.dataService.marcarTareaComoPendiente(tarea.idMateria, tarea.idTarea);
    this.refrescarTareas();
  }

  refrescarTareas() {
    const todas = this.dataService.getTareas().filter(t => t.idMateria === this.materia.idMateria);
    this.tareasPendientes = todas.filter(t => !t.estado);
    this.tareasCompletadas = todas.filter(t => t.estado);

    console.log("Tareas pendientes:", this.tareasPendientes.map(t => t.nombre));
    console.log("Tareas completadas:", this.tareasCompletadas.map(t => t.nombre));
  }


  async mostrarToast(mensaje: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }

  onEliminarTarea(tarea: Tarea) {
    this.dataService.eliminarTarea(this.materia.idMateria, tarea.idTarea);
    this.refrescarTareas();
    this.mostrarToast("Tarea eliminada correctamente.", "danger");
  }



  abrirModalNuevaTarea() {
    this.tareaSeleccionada = null;
    this.formTarea = { nombre: '', fecha: new Date(), tipoRecordatorio: 'once' };
    this.modalTareaOpen = true;
  }

  abrirModalEditarTarea(tarea: Tarea) {
    this.tareaSeleccionada = tarea;
    this.formTarea = { ...tarea }; // clonar datos
    this.modalTareaOpen = true;
  }

  cerrarModalTarea() {
    this.modalTareaOpen = false;
  }

  guardarTarea() {
    if (!this.formTarea.nombre || !this.formTarea.fecha) {
      this.mostrarToast("Debes llenar nombre y fecha.");
      return;
    }

    if (this.tareaSeleccionada) {
      // edición
      const tarea = this.materia.tareas.find(t => t.idTarea === this.tareaSeleccionada!.idTarea);
      if (tarea) {
        tarea.nombre = this.formTarea.nombre;
        tarea.fecha = new Date(this.formTarea.fecha);
        tarea.tipoRecordatorio = this.formTarea.tipoRecordatorio;
      }
      this.dataService.updateMateria(this.materia); // ✅ persiste cambios
      this.mostrarToast("Tarea actualizada correctamente.", "success");
    } else {
      // creación
      this.dataService.agregarTarea(
        this.materia.idMateria,
        this.formTarea.nombre,
        new Date(this.formTarea.fecha),
        this.formTarea.tipoRecordatorio
      );
      this.mostrarToast("Tarea creada correctamente.", "success");
    }

    this.cerrarModalTarea();
  }




  // --- Abrir modal en modo creación ---
  abrirModalNuevoCalificable() {
    this.calificableSeleccionado = null;
    this.formCalificable = { nombre: '', nota: null, fecha: new Date(), idActividad: null, idCorte: null };
    this.modalCalificableOpen = true;
  }

  // --- Abrir modal en modo edición ---
  abrirModalEditarCalificable(cal: Calificable) {
    this.calificableSeleccionado = cal;
    this.formCalificable = { ...cal };
    this.modalCalificableOpen = true;
  }

  // --- Eliminar calificable ---
  eliminarCalificable(idCorte: number, idActividad: number, idCalificable: number) {
    console.log("Eliminando calificable:", idCalificable, "de actividad:", idActividad, "corte:", idCorte);
    this.dataService.eliminarCalificable(this.materia.idMateria, idCorte, idActividad, idCalificable);
  }

  // --- Guardar cambios desde el modal ---
  guardarCalificable() {
    if (!this.formCalificable.nombre || !this.formCalificable.fecha ||
      !this.formCalificable.idActividad || !this.formCalificable.idCorte ||
      this.formCalificable.nota == null) {
      this.mostrarToast("Debes llenar todos los campos antes de guardar.");
      return;
    }

    if (this.formCalificable.nota < 0 || this.formCalificable.nota > 5) {
      this.mostrarToast("La nota debe estar entre 0.00 y 5.00.");
      return;
    }

    const corte = this.materia.cortes.find(c => c.idCorte === this.formCalificable.idCorte);
    const actividad = corte?.actividades.find(a => a.idActividad === this.formCalificable.idActividad);

    if (actividad) {
      if (this.calificableSeleccionado) {
        // edición
        this.dataService.editarCalificable(
          this.materia.idMateria,
          corte!.idCorte,
          actividad.idActividad,
          this.calificableSeleccionado.idCalificable,
          this.formCalificable
        );
      } else {
        // creación con jerarquía
        const nuevo = actividad.crearCalificable(
          this.formCalificable.nombre,
          new Date(this.formCalificable.fecha),
          this.formCalificable.tipoRecordatorio || ''
        );
        nuevo.nota = this.formCalificable.nota;
        console.log("Nuevo calificable creado con ID jerárquico:", nuevo.idCalificable);
        this.dataService.updateMateria(this.materia);
      }
    }

    this.cerrarModalCalificable();
  }

  cerrarModalCalificable() {
    this.modalCalificableOpen = false;
  }

  setCorteSeleccionado(event: any) {
    const idActividad = event.detail.value;
    // Buscar el corte correspondiente
    for (const corte of this.materia.cortes) {
      const actividad = corte.actividades.find(a => a.idActividad === idActividad);
      if (actividad) {
        this.formCalificable.idCorte = corte.idCorte;
        break;
      }
    }
  }


  validarNota() {
    if (this.formCalificable.nota != null) {
      // Limitar a dos decimales
      this.formCalificable.nota = parseFloat(this.formCalificable.nota.toFixed(2));
    }

    // Validar rango
    if (this.formCalificable.nota < 0 || this.formCalificable.nota > 5) {
      alert('La nota debe estar entre 0.00 y 5.00');
      this.formCalificable.nota = null;
    }
  }

  abrirModalCriterios() {
    this.modalCriteriosOpen = true;
    this.modal.present();
  }

  abrirPopoverCorte(ev: any) {

    // Abrir el popover y asignar los valores del corte seleccionado
    this.nombreCorte = this.nuevoCorte.nombre;
    this.porcentajeCorte = this.nuevoCorte.porcentaje;
    this.popoverOpenCorte = true;
  }

  abrirPopoverActividad(ev: any, corte: Corte) {
    this.corteSeleccionado = corte;
    this.popoverOpenActividad = true;
  }

  obtenerSumaPorcentajesActividades(corte: Corte): number {
    if (!corte || !corte.actividades) return 0;
    return corte.actividades.reduce((acc, a) => acc + Number(a.porcentaje), 0);
  }

  agregarActividad() {
    if (!this.corteSeleccionado) return;

    // Usar el helper del corte
    this.corteSeleccionado.crearActividad(
      `Actividad ${this.corteSeleccionado.actividades.length + 1}`,
      0
    );

    this.materia.recalcularTodo();
    this.dataService.updateMateria(this.materia);
  }

  editarActividades() {
    try {
      console.log("[EDITAR] Antes de confirmar:", this.corteSeleccionado.actividades.map(a => ({ id: a.idActividad, nombre: a.nombre, porcentaje: a.porcentaje })));

      for (const actividad of this.corteSeleccionado.actividades) {
        this.corteService.editarActividad(this.corteSeleccionado, actividad.idActividad, {
          nombre: actividad.nombre,
          porcentaje: actividad.porcentaje
        });
      }

      const total = this.obtenerSumaPorcentajesActividades(this.corteSeleccionado);
      console.log("[EDITAR] Suma de porcentajes:", total);

      if (total !== 100) {
        const alert = document.createElement('ion-alert');
        alert.header = 'Error';
        alert.message = `Los porcentajes deben sumar 100%. Actualmente suman ${total}%.`;
        alert.buttons = ['OK'];
        document.body.appendChild(alert);
        alert.present();
        return;
      }


      this.materia.recalcularTodo();
      this.dataService.updateMateria(this.materia);

      console.log("[EDITAR] Después de confirmar:", this.corteSeleccionado.actividades.map(a => ({ id: a.idActividad, nombre: a.nombre, porcentaje: a.porcentaje })));

      this.popoverOpenActividad = false;
    } catch (error: any) {
      console.error("Error al confirmar edición de actividades:", error);
      alert(error.message);
    }
  }

  eliminarActividad(corte: Corte, idActividad: number) {
    try {
      console.log(`[ELIMINAR] Corte ${corte.idCorte}, intentando borrar actividad con ID ${idActividad}`);
      console.log("[ELIMINAR] Antes:", corte.actividades.map(a => ({ id: a.idActividad, nombre: a.nombre })));

      // 🔑 Usar el servicio (con validación incluida)
      this.corteService.eliminarActividad(corte, idActividad);

      // 🔑 Persistir cambios
      this.materia.recalcularTodo();
      this.dataService.updateMateria(this.materia);

      console.log("[ELIMINAR] Después:", corte.actividades.map(a => ({ id: a.idActividad, nombre: a.nombre })));
    } catch(error: any) {
      console.error("Error al eliminar actividad:", error);

      const alert = document.createElement('ion-alert');
      alert.header = 'Error';
      alert.message = error.message;
      alert.buttons = ['OK'];
      document.body.appendChild(alert);
      alert.present();
    }

  }

  editarCorte() {
    try {
      console.log("Iniciando edición de cortes...");
      for (const corte of this.materia.cortes) {
        this.materiaService.editarCorte(this.materia.idMateria, corte.idCorte, {
          nombre: corte.nombre,
          porcentaje: corte.porcentaje
        });
        console.log(`Después de editar, corte ${corte.idCorte} definitiva:`, corte.notaDefinitiva);
      }


      // 🔑 Validar directamente aquí
      const total = this.materia.cortes.reduce((acc, c) => acc + Number(c.porcentaje), 0);
      console.log("Suma total de porcentajes:", total);

      if (total !== 100) {
        throw new Error(`Los porcentajes deben sumar 100%. Actualmente suman ${total}%.`);
      }

      this.dataService.updateMateria(this.materia);



      this.popoverOpenCorte = false;
      this.modal.dismiss(null, 'confirm');

      console.log("Cambios confirmados y guardados correctamente");
    } catch (error: any) {
      console.error("Error al confirmar edición de cortes:", error);
      alert(error.message);
    }
  }

  obtenerSumaPorcentajes(): number {
    if (!this.materia || !this.materia.cortes) return 0;
    return this.materia.cortes.reduce((acc, c) => acc + Number(c.porcentaje), 0);
  }

  toggleCompletada(materia: Materia) {
    console.log("do nothing");
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  public onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    console.log('dismiss');
  }

  //a partir de este comentario hasta el final se encarga de gestionar la lista de materias guardadas en el mock data, permitiendo editar la materia (lo que basicamente solo abre la pagina dedicada a la materia y toda su informacion). Esto es para verificar que el flujo de navegación entre paginas funciona correctamente, y que la informacion de cada materia se muestra correctamente en su pagina dedicada.

  getColorHex(colorName: string): string {
    const found = this.colores.find(c => c.value === colorName);
    return found ? found.hex : colorName || '#c8c8c8';
  }

}
