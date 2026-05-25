import { Injectable } from '@angular/core';
import { Corte } from '../models/corte';
import { Actividad } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class CorteService {

  // Iniciar creación de actividades. Este método mantiene compatibilidad con el spec.
  iniciarCreacion(corte: Corte) {
    // No hay estado temporal necesario actualmente.
    // Se mantiene para que las pruebas y el flujo de UI sigan funcionando.
  }

  // Finalizar creación y ajustar porcentajes para que sumen 100%.
  finalizarCreacion(corte: Corte) {
    if (!corte || corte.actividades.length === 0) return;

    const total = corte.actividades.reduce((sum, actividad) => sum + (actividad.porcentaje ?? 0), 0);
    const ajuste = 100 - total;
    corte.actividades[0].porcentaje += ajuste;
  }

  // Agregar nueva actividad
  agregarActividad(corte: Corte, actividad: Actividad) {
    if (!corte) return;
    corte.actividades.push(actividad);
  }

  // Editar actividad existente
  editarActividad(corte: Corte, idActividad: number, cambios: Partial<Actividad>) {
    const actividad = corte.actividades.find(a => a.idActividad === idActividad);
    if (!actividad) return;

    if (cambios.nombre !== undefined) {
      actividad.nombre = cambios.nombre;
    }
    if (cambios.porcentaje !== undefined) {
      actividad.porcentaje = cambios.porcentaje;
    }
  }

  // Eliminar actividad (validando que quede al menos una)
  eliminarActividad(corte: Corte, idActividad: number) {
    if (corte.actividades.length <= 1) {
      throw new Error('Un corte debe tener al menos una actividad.');
    }

    const actividad = corte.actividades.find(a => a.idActividad === idActividad);

    // Logs antes de eliminar
    console.log(">>> Eliminando actividad:", actividad?.nombre, "ID:", idActividad);
    console.log(">>> Calificables asociados que se eliminarán:", actividad?.calificables);

    // Eliminar la actividad completa (con sus calificables)
    corte.actividades = corte.actividades.filter(a => a.idActividad !== idActividad);

    // Logs después de eliminar
    console.log(">>> Actividades restantes en corte", corte.idCorte, ":", corte.actividades.map(a => a.nombre));
    console.log(">>> Calificables restantes en corte", corte.idCorte, ":",
      corte.actividades.flatMap(a => a.calificables));

    // Redistribuir porcentajes
    const cantidad = corte.actividades.length;
    if (cantidad === 1) {
      corte.actividades[0].porcentaje = 100;
      return;
    }

    const base = Math.floor(100 / cantidad);
    let restante = 100 - (base * cantidad);

    corte.actividades.forEach((a, index) => {
      a.porcentaje = base;
      if (restante > 0) {
        a.porcentaje += 1;
        restante--;
      }
    });

    // Log final de porcentajes
    console.log(">>> Porcentajes redistribuidos en corte", corte.idCorte, ":",
      corte.actividades.map(a => ({ nombre: a.nombre, porcentaje: a.porcentaje })));
  }



  
}
