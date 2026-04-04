import { TestBed } from '@angular/core/testing';
import { ActividadService } from './ActividadService';
import { Actividad } from '../models/actividad';
import { Calificable } from '../models/calificable';

describe('ActividadService', () => {
  let service: ActividadService;
  let actividad: Actividad;

  beforeEach(() => {
    service = new ActividadService();
    //inicializar una actividad del corte
    actividad = new Actividad(1, 1, 1, 'Quices', 20);
    service.agregarActividad(actividad);
  });

  //RF02 Caso 4: Agregar calificable dentro de la actividad Quices
  it('debería agregar un calificable a la actividad', () => {
    const calificable = new Calificable(1, 1, 1, 1, 'Quiz 1', new Date(), 'weekly');
    service.agregarCalificable(1, calificable);

    const calificables = service.obtenerCalificable(1);
    expect (calificables.length).toBe(1);
    expect (calificables[0].nombre).toBe('Quiz 1');

  });

  //RF02 Caso 5: modificar un calificable existente dentro de la actividad Quices
  it('debería modificar un calificable ya existente', () => {
    const calificable = new Calificable(1, 1, 1, 1, 'Quiz 1', new Date(), 'weekly');
    service.agregarCalificable(1, calificable);

    //editar el calificable existente
    service.editarCalificable(1, 1, { tipoRecordatorio: 'disabled', nota: 4.5 });
    const calificables = service.obtenerCalificable(1);
    expect(calificables[0].tipoRecordatorio).toBe('disabled');
    expect(calificables[0].nota).toBe(4.5);
  });

  //RF02 Caso 6: eliminar un calificable existente dentro de la actividad Quices
  it('debería eliminar un calificable ya existente', () => {
    const calificable = new Calificable(1, 1, 1, 1, 'Quiz 1', new Date(), 'weekly');
    service.agregarCalificable(1, calificable);

    //eliminar el calificable existente
    service.eliminarCalificable(1, 1);

    const calificables = service.obtenerCalificable(1);
    expect(calificables.length).toBe(0);

  });

 
});
