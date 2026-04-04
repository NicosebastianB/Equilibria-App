import { Corte } from '../models/corte';
import { Actividad } from '../models/actividad';

export class CorteService {

  iniciarCreacion(corte: Corte) {
    // Limpia flags antes de empezar
    corte.actividades.forEach(a => a.fijo = false);
  }

  agregarActividad(corte: Corte, actividad: Actividad) {
    // Agregar nueva actividad y marcarla como fija
    actividad.fijo = true;
    corte.actividades.push(actividad);
  }

  finalizarCreacion(corte: Corte) {
    const total = corte.actividades.reduce((acc, a) => acc + a.porcentaje, 0);
    const diferencia = 100 - total;

    // Redistribuir diferencia entre actividades no fijas
    const flexibles = corte.actividades.filter(a => !a.fijo);
    if (flexibles.length > 0) {
      const ajustePorActividad = diferencia / flexibles.length;
      flexibles.forEach(a => a.porcentaje += ajustePorActividad);
    }

    // Validar que sumen 100
    if (!corte.validarPorcentajes()) {
      throw new Error('Los porcentajes no suman 100 al finalizar creación.');
    }

    // Resetear flags
    corte.actividades.forEach(a => a.fijo = false);
  }

  editarActividad(corte: Corte, idActividad: number, cambios: Partial<Actividad>) {
    const actividad = corte.actividades.find(a => a.idActividad === idActividad);
    if (!actividad) return;

    // Actualizar nombre si viene en cambios
    if (cambios.nombre !== undefined) {
      actividad.nombre = cambios.nombre;
    }

    // Actualizar porcentaje si viene en cambios
    if (cambios.porcentaje !== undefined) {
      // Marcar esta actividad como fija
      actividad.fijo = true;
      actividad.porcentaje = cambios.porcentaje;

      // Calcular diferencia con respecto a 100
      const total = corte.actividades.reduce((acc, a) => acc + a.porcentaje, 0);
      const diferencia = 100 - total;

      // Redistribuir diferencia entre actividades flexibles
      const flexibles = corte.actividades.filter(a => !a.fijo);
      if (flexibles.length > 0) {
        const ajustePorActividad = diferencia / flexibles.length;
        flexibles.forEach(a => a.porcentaje += ajustePorActividad);
      }
    }
  }


  eliminarActividad(corte: Corte, idActividad: number) {
    if (corte.actividades.length <= 1) {
      throw new Error('Un corte debe tener al menos una actividad.');
    }
    corte.actividades = corte.actividades.filter(a => a.idActividad !== idActividad);
    this.redistribuirPorcentajes(corte);
  }

  finalizarEdicion(corte: Corte) {
    if (!corte.validarPorcentajes()) {
      throw new Error('Los porcentajes no suman 100 al finalizar edición.');
    }
    corte.actividades.forEach(a => a.fijo = false);
  }

  private redistribuirPorcentajes(corte: Corte) {
    const cantidad = corte.actividades.length;
    if (cantidad === 1) {
      corte.actividades[0].porcentaje = 100;
    } else {
      const nuevoPorcentaje = 100 / cantidad;
      corte.actividades.forEach(a => a.porcentaje = nuevoPorcentaje);
    }
  }
}
