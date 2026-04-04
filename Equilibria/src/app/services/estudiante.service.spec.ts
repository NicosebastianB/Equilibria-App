import { TestBed } from '@angular/core/testing';
import { EstudianteService } from './EstudianteService';
import { Estudiante } from '../models/estudiante';
import { Materia } from '../models/materia';
import { RegistroEstudio } from '../models/registroEstudio';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let estudiante: Estudiante;

  beforeEach(() => {
    service = new EstudianteService();
    // Inicializar el unico estudiante de la app con un nombre y avatar
    estudiante = new Estudiante('Nico', 'Avatar_1');
    service.setEstudiante(estudiante);
  });

  //RF01 Caso 1: agregar materia
  it('debería agregar una materia al estudiante', () => {
    const materia = new Materia(1, 'Matemáticas', 'azul', 3, 'Profesor X', 'Aula 101', 5);
    service.agregarMateria(materia);

    const materias = service.obtenerMaterias();
    expect(materias.length).toBe(1);
    expect(materias[0].nombre).toBe('Matemáticas');
  });

  //RF01 Caso 2: editar materia
  it('debería editar atributos de una materia existente', () => {
    const materia = new Materia(1, 'Matemáticas', 'azul', 3, 'Profesor X', 'Aula 101', 5);
    service.agregarMateria(materia);

    // Editamos directamente atributos de la materia existente
    service.editarMateria(1, { nombre: 'Álgebra', color: 'rojo', creditos: 4, profesor: 'Profesor Y', salon: 'Aula 202' });

    const materias = service.obtenerMaterias();
    expect(materias[0].nombre).toBe('Álgebra');
    expect(materias[0].color).toBe('rojo');
    expect(materias[0].creditos).toBe(4);
    expect(materias[0].profesor).toBe('Profesor Y');
    expect(materias[0].salon).toBe('Aula 202');
  });

  //RF01 Caso 3: eliminar materia

  it('debería eliminar una materia ya existente', () => {
    const materia = new Materia(1, 'Matemáticas', 'azul', 3, 'Profesor X', 'Aula 101', 5);
    service.agregarMateria(materia);

    service.eliminarMateria(1);

    const materias = service.obtenerMaterias();
    expect(materias.length).toBe(0);
  });

  //RF03 Caso 1: calcular las horas de estudio semanales e independientes de una materia
  // Ingeniería de Software: 3 créditos, 3h clase/semana, 16 semanas
  it('debería calcular correctamente las horas de estudio independiente para Ingeniería de Software', () => {
    const materia = new Materia(
      1,
      'Ingeniería de Software',
      'azul',
      3,              // créditos
      'Profesor X',
      'Salon 101',
      3,              // horasClaseSemanal
      16              // semanas
    );

    materia.calcularHorasTrabajo();

    expect(materia.horasTotales).toBe(144);
    expect(materia.horasPresenciales).toBe(48);
    expect(materia.horasIndependientes).toBe(96);
    expect(materia.horasIndependientesPorSemana).toBe(6);
  });

  // Física Acústica: 4 créditos, 5h clase/semana, 16 semanas
  it('debería calcular correctamente las horas de estudio independiente para Física Acústica', () => {
    const materia = new Materia(
      2,
      'Física Acústica',
      'verde',
      4,              // créditos
      'Profesor Y',
      'Salon 202',
      5,              // horasClaseSemanal
      16              // semanas
    );

    materia.calcularHorasTrabajo();

    expect(materia.horasTotales).toBe(192);
    expect(materia.horasPresenciales).toBe(80);
    expect(materia.horasIndependientes).toBe(112);
    expect(materia.horasIndependientesPorSemana).toBe(7);
  });

  // --- Semestre ---
  it('debería configurar correctamente el semestre', () => {
    service.configurarSemestre(
      new Date(2026, 0, 26), // 26 enero
      new Date(2026, 4, 23), // 23 mayo
      [{ inicio: new Date(2026, 2, 30), fin: new Date(2026, 3, 4) }] // vacaciones
    );

    const est = service.getEstudiante();
    expect(est?.semestre).not.toBeNull();
    expect(est?.semestre?.fechaInicio).toEqual(new Date(2026, 0, 26));
    expect(est?.semestre?.fechaFin).toEqual(new Date(2026, 4, 23));
  });

  it('debería calcular correctamente las semanas totales del semestre', () => {
    service.configurarSemestre(
      new Date(2026, 0, 26),
      new Date(2026, 4, 23),
      [{ inicio: new Date(2026, 2, 30), fin: new Date(2026, 3, 4) }]
    );

    const semanasTotales = service.obtenerSemanasTotales();
    expect(semanasTotales).toBe(16); // semanas activas (vacaciones restan)
  });

  it('debería calcular la semana actual correctamente en fecha activa', () => {
    service.configurarSemestre(
      new Date(2026, 0, 26),
      new Date(2026, 4, 23),
      [{ inicio: new Date(2026, 2, 30), fin: new Date(2026, 3, 4) }]
    );

    const semanaActual = service.obtenerSemanaActual(new Date(2026, 3, 10)); // 10 abril
    expect(semanaActual).toBe(11); // ajusta según tu calendario real
  });

  it('debería devolver 0 si la fecha está en vacaciones', () => {
    service.configurarSemestre(
      new Date(2026, 0, 26),
      new Date(2026, 4, 23),
      [{ inicio: new Date(2026, 2, 30), fin: new Date(2026, 3, 4) }]
    );

    const semanaActual = service.obtenerSemanaActual(new Date(2026, 2, 31)); // 31 marzo
    expect(semanaActual).toBe(0);
  });

  it('debería reconfigurar el semestre y recalcular semanas activas', () => {
    // Configuración inicial
    service.configurarSemestre(
      new Date(2026, 0, 26), // 26 enero
      new Date(2026, 4, 23), // 23 mayo
      [{ inicio: new Date(2026, 2, 30), fin: new Date(2026, 3, 4) }] // vacaciones
    );

    let semanasTotales = service.obtenerSemanasTotales();
    expect(semanasTotales).toBe(16); // semanas activas iniciales

    // se corre el semestre una semana
    service.reconfigurarSemestre(
      new Date(2026, 1, 2), // 2 febrero
      new Date(2026, 4, 30), // 30 mayo
      [{ inicio: new Date(2026, 3, 6), fin: new Date(2026, 3, 11) }] // vacaciones nuevas
    );

    semanasTotales = service.obtenerSemanasTotales();
    expect(semanasTotales).toBe(16); // ajusta según el nuevo cálculo real
  });

});

describe('EstudianteService - Proporción de estudio', () => {
  let service: EstudianteService;
  let estudiante: Estudiante;

  beforeEach(() => {
    service = new EstudianteService();
    estudiante = new Estudiante('Nico', 'Avatar_1');
    service.setEstudiante(estudiante);
  });

  it('debería calcular correctamente la proporción de estudio entre materias activas', () => {
    const fisica = new Materia(1, 'Física', 'azul', 4, 'Profesor F', 'Aula 101', 5, 16);
    const software = new Materia(2, 'Ingeniería de Software', 'verde', 3, 'Profesor S', 'Aula 202', 3, 16);

    // Agregamos materias al estudiante
    service.agregarMateria(fisica);
    service.agregarMateria(software);

    // Simulamos registros de estudio
    fisica.agregarRegistro(new RegistroEstudio(1, fisica.idMateria, new Date(2026, 2, 10), 240)); // 4h
    software.agregarRegistro(new RegistroEstudio(2, software.idMateria, new Date(2026, 2, 11), 360)); // 6h

    const proporciones = service.calcularProporcionEstudio();

    expect(proporciones['Física']).toBeCloseTo(40, 1); // 40%
    expect(proporciones['Ingeniería de Software']).toBeCloseTo(60, 1); // 60%
  });

  it('no debería incluir materias finalizadas en la proporción', () => {
    const fisica = new Materia(1, 'Física', 'azul', 4, 'Profesor F', 'Aula 101', 5, 16);
    const software = new Materia(2, 'Ingeniería de Software', 'verde', 3, 'Profesor S', 'Aula 202', 3, 16);

    service.agregarMateria(fisica);
    service.agregarMateria(software);

    fisica.agregarRegistro(new RegistroEstudio(1, fisica.idMateria, new Date(2026, 2, 10), 240)); // 4h
    software.agregarRegistro(new RegistroEstudio(2, software.idMateria, new Date(2026, 2, 11), 360)); // 6h

    // Marcamos Física como finalizada
    fisica.finalizado = true;

    const proporciones = service.calcularProporcionEstudio();

    expect(proporciones['Física']).toBeUndefined();
    expect(proporciones['Ingeniería de Software']).toBeCloseTo(100, 1); // 100% porque es la única activa
  });
});

