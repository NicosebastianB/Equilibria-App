import { Injectable } from '@angular/core';
import { Materia } from '../models/materia';
import { Tarea } from '../models/tarea';
import { Horario } from '../models/horario';
import { Corte } from '../models/corte';
import { RegistroEstudio } from '../models/registroEstudio';
import { Actividad } from '../models/actividad';
import { Calificable } from '../models/calificable';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private materias: Materia[] = [];

  constructor() {
    this.cargarDatos();
  }

  // Cargar desde localStorage
  private cargarDatos() {
    const materiasGuardadas = localStorage.getItem('materias');


    if (materiasGuardadas) {
      const materiasData = JSON.parse(materiasGuardadas);
      this.materias = materiasData.map((data: any) => {
        const materia = new Materia(
          data.idMateria,
          data.nombre,
          data.color,
          data.creditos,
          data.profesor,
          data.horasClaseSemanal,
          data.semanas,
          data.finalizado
        );

        materia.definitiva = data.definitiva;
        materia.notaFaltante = data.notaFaltante;

        // 🔑 reconstruir cortes con actividades y calificables
        // 🔑 reconstruir cortes con actividades y calificables
        if (data.cortes) {
          materia.cortes = data.cortes.map((c: any) => {
            const corte = new Corte(data.idMateria, c.idCorte, c.nombre, c.porcentaje);
            corte.fijo = c.fijo;

            if (c.actividades) {
              corte.actividades = c.actividades.map((a: any) => {
                // Inicializar actividad con calificables vacíos
                const actividad = new Actividad(
                  a.idMateria,
                  a.idCorte,
                  a.idActividad,
                  a.nombre,
                  a.porcentaje,
                  [], // 🔑 inicializar vacío
                  a.notaDefinitiva,
                  a.fijo
                );

                // Reconstruir calificables como instancias reales
                if (a.calificables) {
                  actividad.calificables = a.calificables.map((cal: any) => {
                    return new Calificable(
                      cal.idMateria,
                      cal.idCorte,
                      cal.idActividad,
                      cal.idCalificable,
                      cal.nombre,
                      new Date(cal.fecha), // 🔑 reconstruir fecha
                      cal.tipoRecordatorio,
                      cal.nota
                    );
                  });
                }

                return actividad;
              });
            }

            return corte;
          });
        }
  

        materia.horarios = (data.horarios || []).map((h: any) =>
          new Horario(h.id, materia.idMateria, h.dia, h.horaInicio, h.duracionHoras, h.salon)
        );

        if (data.tareas) {
          data.tareas.forEach((t: any) => {
            const tarea = new Tarea(
              t.idMateria,
              t.nombre,
              new Date(t.fecha), // 🔑 reconstruir fecha
              t.tipoRecordatorio
            );
            tarea.idTarea = t.idTarea;
            tarea.estado = t.estado;
            materia.tareas.push(tarea);
          });
        }

        if (data.registros) {
          materia.registros = data.registros.map((r: any) =>
            new RegistroEstudio(
              r.idRegistro,
              r.idMateria,
              new Date(r.fecha), // 🔑 reconstruir fecha
              r.duracionMinutos
            )
          );
        }


        return materia;
      });

    } else {
      this.materias = [];
    }
  }

  // Guardar en localStorage
  private guardarDatos() {
    const materiasData = this.materias.map(m => ({
      idMateria: m.idMateria,
      nombre: m.nombre,
      color: m.color,
      creditos: m.creditos,
      profesor: m.profesor,
      horasClaseSemanal: m.horasClaseSemanal,
      semanas: m.semanas,
      finalizado: m.finalizado,
      definitiva: m.definitiva,
      notaFaltante: m.notaFaltante,

      // 🔑 serializar cortes con actividades y calificables
      cortes: m.cortes.map(c => ({
        idCorte: c.idCorte,
        nombre: c.nombre,
        porcentaje: c.porcentaje,
        fijo: c.fijo,
        actividades: c.actividades.map(a => ({
          idMateria: a.idMateria,
          idCorte: a.idCorte,
          idActividad: a.idActividad,
          nombre: a.nombre,
          porcentaje: a.porcentaje,
          notaDefinitiva: a.notaDefinitiva,
          calificables: a.calificables.map(cal => ({
            idMateria: cal.idMateria,
            idCorte: cal.idCorte,
            idActividad: cal.idActividad,
            idCalificable: cal.idCalificable,
            nombre: cal.nombre,
            fecha: cal.fecha,
            tipoRecordatorio: cal.tipoRecordatorio,
            nota: cal.nota
          }))
        }))
      })),

      // horarios
      horarios: m.horarios.map(h => ({
        id: h.id,
        dia: h.dia,
        horaInicio: h.horaInicio,
        duracionHoras: h.duracionHoras,
        salon: h.salon
      })),

      // tareas
      tareas: m.tareas.map(t => ({
        idTarea: t.idTarea,
        idMateria: t.idMateria,
        nombre: t.nombre,
        fecha: t.fecha,
        tipoRecordatorio: t.tipoRecordatorio,
        estado: t.estado
      })),

      // registros de estudio
      registros: m.registros.map(r => ({
        fecha: r.fecha,
        duracionMinutos: r.duracionMinutos
      }))
    }));

    localStorage.setItem('materias', JSON.stringify(materiasData));
  }


  // Materias
  getMaterias(): Materia[] {
    return this.materias;
  }

  addMateria(materia: Materia) {
    this.materias.push(materia);
    this.guardarDatos();
  }


  updateMateria(materia: Materia) {
    const index = this.materias.findIndex(m => m.idMateria === materia.idMateria);
    if (index !== -1) {
      const existente = this.materias[index];

      // 🔑 actualizar solo los campos editables
      existente.nombre = materia.nombre;
      existente.color = materia.color;
      existente.creditos = materia.creditos;
      existente.profesor = materia.profesor;
      existente.horasClaseSemanal = materia.horasClaseSemanal;
      existente.horarios = materia.horarios;

      // ⚠️ NO tocamos cortes, tareas ni registros → se preservan
      // existente.cortes, existente.tareas y existente.registros siguen intactos

      this.guardarDatos();
    }
  }



  eliminarMateria(id: number) {
    this.materias = this.materias.filter(m => m.idMateria !== id);
    this.guardarDatos();
  }

  // Tareas (siempre desde materias)
  getTareas(): Tarea[] {
    const todas = this.materias.flatMap(m => m.tareas);
    return todas;
  }

  agregarTarea(idMateria: number, nombre: string, fecha: Date, tipoRecordatorio: string) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    materia?.agregarTarea(nombre, fecha, tipoRecordatorio);
    this.guardarDatos();
  }

  eliminarTarea(idMateria: number, idTarea: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    if (materia) {
      materia.tareas = materia.tareas.filter(t => t.idTarea !== idTarea);
      this.guardarDatos();
    }
  }

  marcarTareaComoCompletada(idMateria: number, idTarea: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    const tarea = materia?.tareas.find(t => t.idTarea === idTarea);
    if (tarea) {
      tarea.estado = true;
      this.guardarDatos();
    }
  }

  marcarTareaComoPendiente(idMateria: number, idTarea: number) {
    const materia = this.materias.find(m => m.idMateria === idMateria);
    const tarea = materia?.tareas.find(t => t.idTarea === idTarea);
    if (tarea) {
      tarea.estado = false;
      this.guardarDatos();
    }
  }
}
