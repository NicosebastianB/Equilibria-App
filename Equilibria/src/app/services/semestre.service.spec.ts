import { TestBed } from '@angular/core/testing';
import { SemestreService } from './SemestreService';
import { Semestre } from '../models/semestre';

describe('Semestre', () => {

  it('debería calcular correctamente las semanas totales del semestre', () => {
    const semestre = new Semestre(
      1,
      '2026-1',
      new Date(2026, 0, 26), // 26 enero
      new Date(2026, 4, 23), // 23 mayo
      [{ inicio: new Date(2026, 2, 30), fin: new Date(2026, 3, 4) }] // vacaciones
    );

    const semanasTotales = semestre.calcularSemanasTotales();
    expect(semanasTotales).toBe(16); // Ajusta según tu cálculo real
  });

  it('debería calcular la semana actual correctamente (ejemplo: 3 abril 2026)', () => {
    const semestre = new Semestre(
      1,
      '2026-1',
      new Date(2026, 0, 26),
      new Date(2026, 4, 23),
      [{ inicio: new Date(2026, 2, 30), fin: new Date(2026, 3, 4) }]
    );

    const semanaActual = semestre.calcularSemanaActual(new Date(2026, 3, 3)); // 3 abril
    expect(semanaActual).toBe(0); // Ajusta según tu calendario real
  });

  it('debería detectar correctamente si una fecha está en vacaciones', () => {
    const semestre = new Semestre(
      1,
      '2026-1',
      new Date(2026, 0, 26),
      new Date(2026, 4, 23),
      [{ inicio: new Date(2026, 2, 30), fin: new Date(2026, 3, 4) }]
    );

    const esVacaciones = semestre.esSemanaDeVacaciones(new Date(2026, 2, 31)); // 31 marzo
    expect(esVacaciones).toBe(true);
  });

  it('no debería marcar como vacaciones una fecha fuera del rango', () => {
    const semestre = new Semestre(
      1,
      '2026-1',
      new Date(2026, 0, 26),
      new Date(2026, 4, 23),
      [{ inicio: new Date(2026, 2, 30), fin: new Date(2026, 3, 4) }]
    );

    const esVacaciones = semestre.esSemanaDeVacaciones(new Date(2026, 1, 15)); // 15 febrero
    expect(esVacaciones).toBe(false);
  });



});
