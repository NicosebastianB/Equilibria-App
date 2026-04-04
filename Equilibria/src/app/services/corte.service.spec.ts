import { TestBed } from '@angular/core/testing';
import { CorteService } from './CorteService';
import { Corte } from '../models/corte';
import { Actividad } from '../models/actividad';

describe('CorteService', () => {
  let service: CorteService;
  let corte: Corte;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new CorteService();
    // Inicializar un corte con su actividad por defecto
    corte = new Corte(1, 1, 'Corte 1', 30);
  });

  // Test 1: verificar que un corte se cree automáticamente con una actividad por defecto
  it('debería crear un corte con una actividad por defecto al 100%', () => {
    expect(corte.actividades.length).toBe(1);
    expect(corte.actividades[0].nombre).toBe('Actividad 1');
    expect(corte.actividades[0].porcentaje).toBe(100);
  });

  // Test 2: verificar que no se puede eliminar una actividad si es la única que queda en el corte
  it('no debería permitir eliminar la única actividad del corte', () => {
    expect(() => service.eliminarActividad(corte, 1))
      .toThrowError('Un corte debe tener al menos una actividad.');
    expect(corte.actividades.length).toBe(1);
  });

  //RF02 Caso 9: agregar actividades respetando porcentajes
  // Test 3: agregar dos actividades con porcentajes de 30 y 30, esperando que la inicial quede en 40
  it('debería respetar porcentajes iniciales al agregar actividades y redistribuir al finalizar creación', () => {
    service.iniciarCreacion(corte);
    service.agregarActividad(corte, new Actividad(1, 1, 2, 'Actividad 2', 30));
    service.agregarActividad(corte, new Actividad(1, 1, 3, 'Actividad 3', 30));
    service.finalizarCreacion(corte);

    const porcentajes = corte.actividades.map(a => a.porcentaje);
    expect(porcentajes.reduce((acc, p) => acc + p, 0)).toBe(100);
    expect(porcentajes).toEqual([40, 30, 30]);
  });

  //RF02 Caso 10: editar actividades con porcentajes fijos
  // Test 4: edición múltiple con atributo fijo
  it('debería respetar actividades editadas con atributo fijo', () => {
    service.iniciarCreacion(corte);
    service.agregarActividad(corte, new Actividad(1, 1, 2, 'Actividad 2', 30));
    service.agregarActividad(corte, new Actividad(1, 1, 3, 'Actividad 3', 40));

    // Editar actividad 2 a 50%
    service.editarActividad(corte, 2, { porcentaje: 50 });
    // Editar actividad 3 a 20%
    service.editarActividad(corte, 3, { porcentaje: 20 });

    service.finalizarCreacion(corte);

    const porcentajes = corte.actividades.map(a => a.porcentaje);
    expect(porcentajes.reduce((acc, p) => acc + p, 0)).toBe(100);
    expect(porcentajes).toEqual([30, 50, 20]);
  });

  //RF02 Caso 11: eliminar actividades y redistribuir porcentajes
  // Test 5: eliminar una actividad y redistribuir porcentajes
  it('debería redistribuir porcentajes al eliminar una actividad', () => {
    service.iniciarCreacion(corte);
    service.agregarActividad(corte, new Actividad(1, 1, 2, 'Actividad 2', 20));
    service.agregarActividad(corte, new Actividad(1, 1, 3, 'Actividad 3', 30));
    service.finalizarCreacion(corte);

    service.eliminarActividad(corte, 2);

    const porcentajes = corte.actividades.map(a => a.porcentaje);
    expect(porcentajes.reduce((acc, p) => acc + p, 0)).toBe(100);
    expect(corte.actividades.length).toBe(2);
  });
});
