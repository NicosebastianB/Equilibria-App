import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Recordatorio } from '../models/recordatorio';
import { Materia } from '../models/materia';
import { Semestre } from '../models/semestre';
import { 
    MOCK_ESTUDIANTE,
    MOCK_RECORDATORIO,
    MOCK_MATERIAS,
    MOCK_SEMESTRE
 } from '../mocks/mock-data';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }

  /**
   * Obtiene el estudiante mock (único en este caso)
   */
  getEstudiante(): Estudiante {
    return MOCK_ESTUDIANTE[0];
  }

  /**
   * Obtiene todos los estudiantes mock (array)
   */
  getEstudiantes(): Estudiante[] {
    return MOCK_ESTUDIANTE;
  }

  /**
   * Obtiene el recordatorio mock
   */
  getRecordatorio(): Recordatorio {
    return MOCK_RECORDATORIO;
  }

  /**
   * Obtiene todos los recordatorios mock (array con uno)
   */
  getRecordatorios(): Recordatorio[] {
    return [MOCK_RECORDATORIO];
  }

  /**
   * Obtiene todas las materias mock
   */
  getMaterias(): Materia[] {
    return MOCK_MATERIAS;
  }

  /**
   * Obtiene una materia específica por ID
   */
  getMateriaById(id: number): Materia | undefined {
    return MOCK_MATERIAS.find(materia => materia.idMateria === id);
  }

  /**
   * Obtiene el semestre mock
   */
  getSemestre(): Semestre {
    return MOCK_SEMESTRE;
  }
}
