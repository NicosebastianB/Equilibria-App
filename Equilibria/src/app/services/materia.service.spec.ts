import { TestBed } from '@angular/core/testing';
import { MateriaService } from './MateriaService';
import { Materia } from '../models/materia';
import { Tarea } from '../models/tarea';
import { RegistroEstudio } from '../models/registroEstudio';
import { Semestre } from '../models/semestre';
import { Corte } from '../models/corte';
import { Calificable } from '../models/calificable';
import { Actividad } from '../models/actividad';



describe('MateriaService', () => {
  let service: MateriaService;
  let materia: Materia;

  //crear una instancia de materia
  beforeEach(() => {
    service = new MateriaService();
    materia = new Materia(1, 'Matemáticas', 'azul', 3, 'Profesor X', 'Aula 101', 5);
    service.agregarMateria(materia);
  });

  //RF02: Caso 1: crear una tarea
  it('debería agregar una tarea a la materia Matemáticas', () => {
    const tarea = new Tarea(materia.idMateria, 1, 'Examen parcial', new Date(), 'daily_until_due_date', false);
    service.agregarTarea(materia.idMateria, tarea);

    const tareas = service.obtenerTareas(materia.idMateria);
    expect(tareas.length).toBe(1);
    expect(tareas[0].nombre).toBe('Examen parcial');
    expect(tareas[0].estado).toBe(false);
  });

  //RF02: Caso 2: editar una tarea
  it('debería editar atributos de una tarea existente', () => {
    const tarea = new Tarea(materia.idMateria, 1, 'Examen parcial', new Date(), 'daily_until_due_date', false);
    service.agregarTarea(materia.idMateria, tarea);

    service.editarTarea(materia.idMateria, 1, { nombre: 'Examen final', estado: true });

    const tareas = service.obtenerTareas(materia.idMateria);
    expect(tareas[0].nombre).toBe('Examen final');
    expect(tareas[0].estado).toBe(true);
  });

  //RF02: Caso 3: eliminar una tarea
  it('debería eliminar una tarea de la materia', () => {
    const tarea = new Tarea(materia.idMateria, 1, 'Examen parcial', new Date(), 'daily_until_due_date', false);
    service.agregarTarea(materia.idMateria, tarea);

    // Eliminamos la tarea por su id
    service.eliminarTarea(materia.idMateria, 1);

    const tareas = service.obtenerTareas(materia.idMateria);
    expect(tareas.length).toBe(0);
  });

  //RF02.
  //una materia inicia con tres cortes por defecto
   it('debería inicializar la materia con tres cortes por defecto', () => {
    expect(materia.cortes.length).toBe(3);
    expect(materia.cortes[0].nombre).toBe('Corte 1');
    expect(materia.cortes[0].porcentaje).toBe(30);
    expect(materia.cortes[1].nombre).toBe('Corte 2');
    expect(materia.cortes[1].porcentaje).toBe(30);
    expect(materia.cortes[2].nombre).toBe('Corte 3');
    expect(materia.cortes[2].porcentaje).toBe(40);
    expect(materia.validarPorcentajes()).toBeTrue();
  });

  //RF02 Caso 7: editar cortes y ajustar porcentajes
  it('debería ajustar los porcentajes correctamente respetando cortes editados', () => {
    // Cambiar el tercer corte a 50%
    service.editarCorte(materia.idMateria, 3, { porcentaje: 50 });
    expect(materia.cortes[2].porcentaje).toBe(50);

    // Cambiar el primer corte a 20%
    service.editarCorte(materia.idMateria, 1, { porcentaje: 20 });
    expect(materia.cortes[0].porcentaje).toBe(20);
    expect(materia.cortes[1].porcentaje).toBe(30);
    expect(materia.cortes[2].porcentaje).toBe(50);

    // Finalizar edición
    service.finalizarEdicion(materia.idMateria);
    expect(materia.validarPorcentajes()).toBeTrue();
    // Y todos los cortes deben estar reseteados (fijo = false)
    expect(materia.cortes.every(c => c.fijo === false)).toBeTrue();
  });

});

describe('MateriaService . Estadisticas de materia', () => {
  let service: MateriaService;
  let materia: Materia;

  //crear una instancia de materia
  beforeEach(() => {
    service = new MateriaService();
    materia = new Materia(1, 'Matemáticas', 'azul', 3, 'Profesor X', 'Aula 101', 5);
    service.agregarMateria(materia);
  });

  it('debería calcular correctamente las horas acumuladas de estudio en una materia', () => {
    const registro1 = new RegistroEstudio(1, materia.idMateria, new Date(2026, 2, 10), 120); // 2h
    const registro2 = new RegistroEstudio(2, materia.idMateria, new Date(2026, 2, 11), 60);  // 1h

    materia.agregarRegistro(registro1);
    materia.agregarRegistro(registro2);

    const horas = service.obtenerHorasAcumuladas(materia);
    expect(horas).toBe(3);
  });

  it('debería calcular correctamente el historial semanal de horas de estudio', () => {
    const semestre = new Semestre(1, 'Semestre actual', new Date(2026, 0, 26), new Date(2026, 4, 23), []);
    semestre.calcularSemanasTotales();

    // Registro en semana 1
    const registro1 = new RegistroEstudio(1, materia.idMateria, new Date(2026, 0, 27), 120); // 2h
    // Registro en semana 2
    const registro2 = new RegistroEstudio(2, materia.idMateria, new Date(2026, 1, 3), 60);  // 1h

    materia.agregarRegistro(registro1);
    materia.agregarRegistro(registro2);

    const historial = service.obtenerHistorialSemanal(materia, semestre);

    expect(historial[0]).toBe(2); // semana 1 → 2h
    expect(historial[1]).toBe(1); // semana 2 → 1h
  });

  it('debería calcular correctamente el cumplimiento semanal de una materia', () => {
    const semestre = new Semestre(1, 'Semestre actual', new Date(2026, 0, 26), new Date(2026, 4, 16), []);
    semestre.calcularSemanasTotales();
    semestre.semanaActual = 1; // forzamos semana actual para el test

    materia.horasIndependientesPorSemana = 4; // horas esperadas por semana

    const registro = new RegistroEstudio(1, materia.idMateria, new Date(2026, 0, 27), 60); // 1h
    materia.agregarRegistro(registro);

    const cumplimiento = service.obtenerCumplimientoSemanal(materia, semestre);

    expect(cumplimiento).toBeCloseTo(25, 1); // 1h de 4h → 25%
  });
});

describe('MateriaService . Estadísticas de notas', () => {
  let service: MateriaService;
  let materia: Materia;

  beforeEach(() => {
    service = new MateriaService();
    materia = new Materia(1, 'Matemáticas', 'azul', 3, 'Profesor X', 'Aula 101', 5);
    service.agregarMateria(materia);

    // Configuramos cortes con porcentajes
    materia.cortes[0].porcentaje = 30;
    materia.cortes[1].porcentaje = 30;
    materia.cortes[2].porcentaje = 40;
  });

  it('debería calcular correctamente la nota definitiva de una materia', () => {
    // Corte 1 con una actividad y calificables
    const actividad1 = new Actividad(1, 1, 1, 'Parcial 1', 100, [
      new Calificable(1, 1, 1, 1, 'Pregunta 1', new Date(), 'once',  3.5),
      new Calificable(1, 1, 1, 2, 'Pregunta 2', new Date(), 'once',  4.0),
    ]);
    materia.cortes[0].actividades.push(actividad1);

    const definitiva = materia.calcularDefinitiva();
    // Promedio actividad = 3.75 → Corte 1 aporta 1.125 (30%)
    expect(definitiva).toBeCloseTo(1.125, 2);
  });

  it('debería calcular cuánto falta para pasar con nota mínima 3.0', () => {
    // Corte 1 con nota parcial
    const actividad1 = new Actividad(1, 1, 1, 'Parcial 1', 100, [
      new Calificable(1, 1, 1, 1, 'Pregunta 1', new Date(), 'once',  2.5),
    ]);
    materia.cortes[0].actividades.push(actividad1);

    materia.calcularDefinitiva();
    const faltante = materia.calcularNotaFaltante(3.0);

    // Nota actual = 0.75 (2.5 * 30%)
    // Peso restante = 70%
    // Faltante = (3.0 - 0.75) / 0.7 ≈ 3.21
    expect(faltante).toBeCloseTo(3.21, 2);
  });

  it('debería devolver 0 si ya no hay cortes restantes', () => {
    // Corte 1 y Corte 2 con notas
    materia.cortes[0].actividades.push(
      new Actividad(1, 1, 1, 'Parcial 1', 100, [new Calificable(1, 1, 1, 1, 'Pregunta 1', new Date(), 'once',  3.0)])
    );
    materia.cortes[1].actividades.push(
      new Actividad(1, 2, 2, 'Parcial 2', 100, [new Calificable(1, 1, 1, 2, 'Pregunta 1', new Date(), 'once',  4.0)])
    );
    materia.cortes[2].actividades.push(
      new Actividad(1, 3, 3, 'Parcial 3', 100, [new Calificable(1, 1, 1, 3, 'Pregunta 1', new Date(), 'once',  5.0)])
    );

    materia.calcularDefinitiva();
    const faltante = materia.calcularNotaFaltante(3.0);

    expect(faltante).toBe(0);
  });
});
