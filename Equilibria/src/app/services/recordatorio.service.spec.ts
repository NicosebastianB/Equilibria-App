import { TestBed } from '@angular/core/testing';
import { RecordatorioService } from './RecordatorioService';
import { Recordatorio } from '../models/recordatorio';

describe('RecordatorioService', () => {
  let service: RecordatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordatorioService);
  });

  it('debería inicializar con recordatorios saludables preestablecidos', () => {
    const recordatorios = service.obtenerRecordatorios();
    expect(recordatorios.length).toBeGreaterThan(0);

    const nombres = recordatorios.map(r => r.nombre);
    expect(nombres).toContain('Bebe agua');
    expect(nombres).toContain('Cuida tu postura');
    expect(nombres).toContain('Toma un descanso activo');
    expect(nombres).toContain('Descansa la vista');
  });

  it('debería permitir crear un nuevo recordatorio personalizado', () => {
    const nuevo = new Recordatorio(
      99,
      'Revisar apuntes',
      'rojo',
      'once',
      'study_mode',
      true
    );

    service.agregarRecordatorio(nuevo);

    const recordatorios = service.obtenerRecordatorios();
    const creado = recordatorios.find(r => r.idRecordatorio === 99);

    expect(creado).toBeTruthy();
    expect(creado?.nombre).toBe('Revisar apuntes');
    expect(creado?.frecuencia).toBe('once');
    expect(creado?.modoEstudio).toBe('study_mode');
  });

  it('debería permitir editar un recordatorio existente', () => {
    const recordatorios = service.obtenerRecordatorios();
    const id = recordatorios[0].idRecordatorio;

    service.editarRecordatorio(id, { color: 'amarillo', frecuencia: 'weekly' });

    const editado = service.obtenerRecordatorios().find(r => r.idRecordatorio === id);
    expect(editado?.color).toBe('amarillo');
    expect(editado?.frecuencia).toBe('weekly');
  });

  it('debería permitir configurar un recordatorio reemplazando su configuración completa', () => {
    const recordatorios = service.obtenerRecordatorios();
    const id = recordatorios[0].idRecordatorio;

    const nuevaConfig = new Recordatorio(
      id,
      'Nuevo hábito',
      'gris',
      'daily',
      'general',
      false
    );

    service.configurarRecordatorio(id, nuevaConfig);

    const configurado = service.obtenerRecordatorios().find(r => r.idRecordatorio === id);
    expect(configurado?.nombre).toBe('Nuevo hábito');
    expect(configurado?.color).toBe('gris');
    expect(configurado?.notificacionesActivas).toBe(false);
  });
});
