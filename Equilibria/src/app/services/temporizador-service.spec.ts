import { TestBed } from '@angular/core/testing';
import { TemporizadorService } from './TemporizadorService';
import { TemporizadorConfig } from '../models/temporizadorConfig';
import { TemporizadorEstado } from '../models/temporizadorEstado';

describe('TemporizadorService', () => {
  let service: TemporizadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemporizadorService);
  });

  it('debería configurar correctamente el temporizador', () => {
    const config = new TemporizadorConfig(1, 25, 5, 3, true);
    service.configurar(config);

    const estado = service.obtenerEstado();
    expect(estado?.cicloActual).toBe(1);
    expect(estado?.fase).toBe('concentracion');
    expect(estado?.tiempoRestante).toBe(25 * 60);
  });

  it('debería avanzar de concentración a descanso', () => {
    const config = new TemporizadorConfig(1, 25, 5, 3, true);
    service.configurar(config);

    service.avanzarFase();
    const estado = service.obtenerEstado();
    expect(estado?.fase).toBe('descanso');
    expect(estado?.tiempoRestante).toBe(5 * 60);
  });

  it('debería avanzar de descanso al siguiente ciclo de concentración', () => {
    const config = new TemporizadorConfig(1, 25, 5, 2, true);
    service.configurar(config);

    // Pasar a descanso
    service.avanzarFase();
    // Pasar al siguiente ciclo
    service.avanzarFase();

    const estado = service.obtenerEstado();
    expect(estado?.cicloActual).toBe(2);
    expect(estado?.fase).toBe('concentracion');
    expect(estado?.tiempoRestante).toBe(25 * 60);
  });

  it('debería finalizar el temporizador después de todos los ciclos', () => {
    const config = new TemporizadorConfig(1, 25, 5, 1, true);
    service.configurar(config);

    // Pasar a descanso
    service.avanzarFase();
    // Pasar a finalizado
    service.avanzarFase();

    const estado = service.obtenerEstado();
    expect(estado?.fase).toBe('finalizado');
    expect(estado?.tiempoRestante).toBe(0);
  });
});
