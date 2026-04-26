import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Recordatorio } from '../models/recordatorio';
import { Materia } from '../models/materia';
import { Semestre } from '../models/semestre';
import { Tarea } from '../models/tarea';
import { RegistroEstudio } from '../models/registroEstudio';
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
  getEstudiante(): Estudiante {
    return MOCK_ESTUDIANTE[0];
  }

  getEstudiantes(): Estudiante[] {
    return MOCK_ESTUDIANTE;
  }

  getRecordatorio(): Recordatorio {
    return MOCK_RECORDATORIO;
  }

  getRecordatorios(): Recordatorio[] {
    return [MOCK_RECORDATORIO];
  }

  getMaterias(): Materia[] {
    MOCK_MATERIAS.forEach(m => console.log('Materia en MockService:', m.nombre, 'Tareas:', m.tareas));
    return MOCK_MATERIAS;
  }

  getRegistrosEstudioByMateriaId(id: number): RegistroEstudio[] {
    const materia = MOCK_MATERIAS.find(m => m.idMateria === id);
    if (materia) {
      return materia.registros;
    } else {
      return []; 
    }
  }

  getMateriaById(id: number): Materia | undefined {
    return MOCK_MATERIAS.find(materia => materia.idMateria === id);
  }

  getSemestre(): Semestre {
    return MOCK_SEMESTRE;
  }

  getTareas(): Tarea[] {
    return MOCK_MATERIAS.flatMap(m => m.tareas);
  }
}
