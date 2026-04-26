import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Recordatorio } from '../models/recordatorio';
import { Materia } from '../models/materia';
import { Semestre } from '../models/semestre';
<<<<<<< HEAD
import { Tarea } from '../models/tarea';
import { RegistroEstudio } from '../models/registroEstudio';
import {
  MOCK_ESTUDIANTE,
  MOCK_RECORDATORIO,
  MOCK_MATERIAS,
  MOCK_SEMESTRE
} from '../mocks/mock-data';
=======
import { 
    MOCK_ESTUDIANTE,
    MOCK_RECORDATORIO,
    MOCK_MATERIAS,
    MOCK_SEMESTRE
 } from '../mocks/mock-data';
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423

@Injectable({
  providedIn: 'root'
})
export class MockService {
<<<<<<< HEAD
=======

  constructor() { }

  /**
   * Obtiene el estudiante mock (único en este caso)
   */
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
  getEstudiante(): Estudiante {
    return MOCK_ESTUDIANTE[0];
  }

<<<<<<< HEAD
=======
  /**
   * Obtiene todos los estudiantes mock (array)
   */
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
  getEstudiantes(): Estudiante[] {
    return MOCK_ESTUDIANTE;
  }

<<<<<<< HEAD
=======
  /**
   * Obtiene el recordatorio mock
   */
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
  getRecordatorio(): Recordatorio {
    return MOCK_RECORDATORIO;
  }

<<<<<<< HEAD
=======
  /**
   * Obtiene todos los recordatorios mock (array con uno)
   */
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
  getRecordatorios(): Recordatorio[] {
    return [MOCK_RECORDATORIO];
  }

<<<<<<< HEAD
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

=======
  /**
   * Obtiene todas las materias mock
   */
  getMaterias(): Materia[] {
    return MOCK_MATERIAS;
  }

  /**
   * Obtiene una materia específica por ID
   */
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
  getMateriaById(id: number): Materia | undefined {
    return MOCK_MATERIAS.find(materia => materia.idMateria === id);
  }

<<<<<<< HEAD
  getSemestre(): Semestre {
    return MOCK_SEMESTRE;
  }

  getTareas(): Tarea[] {
    return MOCK_MATERIAS.flatMap(m => m.tareas);
  }
=======
  /**
   * Obtiene el semestre mock
   */
  getSemestre(): Semestre {
    return MOCK_SEMESTRE;
  }
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
}
