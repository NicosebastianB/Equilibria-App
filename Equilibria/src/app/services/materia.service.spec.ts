import { TestBed } from '@angular/core/testing';
import { MateriaService } from './MateriaService';
import { Materia } from '../models/materia';
import { Tarea } from '../models/tarea';
import { RegistroEstudio } from '../models/registroEstudio';
import { Semestre } from '../models/semestre';
import { Corte } from '../models/corte';
import { Calificable } from '../models/calificable';
import { Actividad } from '../models/actividad';


describe('MateriaService . Estadisticas de materia', () => {
  let service: MateriaService;
  let materia: Materia;

  //crear una instancia de materia
  beforeEach(() => {
    service = new MateriaService();
    materia = new Materia(1, 'Matemáticas', 'azul', 3, 'Profesor X', 5);
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
  
});

describe('MateriaService . Estadísticas de notas', () => {
  let service: MateriaService;
  let materia: Materia;

  beforeEach(() => {
    service = new MateriaService();
    materia = new Materia(1, 'Matemáticas', 'azul', 3, 'Profesor X', 5);
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

describe('Materia - Gestión de horarios', () => {
  let service: MateriaService;
  let materia: Materia;

  beforeEach(() => {
    service = new MateriaService();
    materia = new Materia(1, 'Matemáticas', 'azul', 3, 'Profesor X', 5);
    service.agregarMateria(materia);
  });

  it('debería agregar tres bloques el lunes y calcular rango 7..10', () => {
    const r1 = service.addHorario(materia.idMateria, 1, 7);
    expect((r1 as any).success).toBeTrue();
    const r2 = service.addHorario(materia.idMateria, 1, 8);
    expect((r2 as any).success).toBeTrue();
    const r3 = service.addHorario(materia.idMateria, 1, 9);
    expect((r3 as any).success).toBeTrue();

    const horarios = service.obtenerHorarios(materia.idMateria);
    expect(horarios.length).toBe(3);
    expect(horarios[0].dia).toBe(1);
    expect(horarios[0].horaInicio).toBe(7);

    const rango = materia.calcularRangoHorarioDia(1);
    expect(rango).not.toBeNull();
    if (rango) {
      expect(rango.inicio).toBe(7);
      expect(rango.fin).toBe(10);
    }
  });

  it('no debería permitir agregar más bloques que horasClaseSemanal', () => {
    // limitar horas presenciales a 2
    materia.horasClaseSemanal = 2;
    const a1 = service.addHorario(materia.idMateria, 2, 9);
    expect((a1 as any).success).toBeTrue();
    const a2 = service.addHorario(materia.idMateria, 2, 10);
    expect((a2 as any).success).toBeTrue();
    const a3 = service.addHorario(materia.idMateria, 2, 11);
    expect((a3 as any).success).toBeFalse();
  });

  it('debería editar y eliminar un bloque horario', () => {
    const added = service.addHorario(materia.idMateria, 3, 10) as any;
    expect(added.success).toBeTrue();
    const id = added.horario.id;

    const upd = service.updateHorario(materia.idMateria, id, 4, 11) as any;
    expect(upd.success).toBeTrue();

    const horarios = service.obtenerHorarios(materia.idMateria);
    expect(horarios.find(h => h.id === id)?.dia).toBe(4);
    expect(horarios.find(h => h.id === id)?.horaInicio).toBe(11);

    const del = service.deleteHorario(materia.idMateria, id);
    expect(del).toBeTrue();
    const after = service.obtenerHorarios(materia.idMateria);
    expect(after.find(h => h.id === id)).toBeUndefined();
  });
});
