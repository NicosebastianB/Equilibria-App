import { Injectable } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { Recordatorio } from '../models/recordatorio';
import { Materia } from '../models/materia';
import { Semestre } from '../models/semestre';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/main
import { Tarea } from '../models/tarea';
import { RegistroEstudio } from '../models/registroEstudio';
import {
  MOCK_ESTUDIANTE,
  MOCK_RECORDATORIO,
  MOCK_MATERIAS,
  MOCK_SEMESTRE
} from '../mocks/mock-data';
<<<<<<< HEAD
=======
import { 
    MOCK_ESTUDIANTE,
    MOCK_RECORDATORIO,
    MOCK_MATERIAS,
    MOCK_SEMESTRE
 } from '../mocks/mock-data';
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
=======
>>>>>>> origin/main

@Injectable({
  providedIn: 'root'
})
export class MockService {
<<<<<<< HEAD
<<<<<<< HEAD
=======

  constructor() { }

  /**
   * Obtiene el estudiante mock (único en este caso)
   */
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
=======
>>>>>>> origin/main
  getEstudiante(): Estudiante {
    return MOCK_ESTUDIANTE[0];
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
  /**
   * Obtiene todos los estudiantes mock (array)
   */
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
=======
>>>>>>> origin/main
  getEstudiantes(): Estudiante[] {
    return MOCK_ESTUDIANTE;
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
  /**
   * Obtiene el recordatorio mock
   */
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
=======
>>>>>>> origin/main
  getRecordatorio(): Recordatorio {
    return MOCK_RECORDATORIO;
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
  /**
   * Obtiene todos los recordatorios mock (array con uno)
   */
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
=======
>>>>>>> origin/main
  getRecordatorios(): Recordatorio[] {
    return [MOCK_RECORDATORIO];
  }

<<<<<<< HEAD
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
=======
>>>>>>> origin/main
  getMaterias(): Materia[] {
    MOCK_MATERIAS.forEach(m => console.log('Materia en MockService:', m.nombre, 'Tareas:', m.tareas));
    return MOCK_MATERIAS;
  }

<<<<<<< HEAD
  /**
   * Obtiene una materia específica por ID
   */
>>>>>>> d3726cc96087019a7ea6e0f4f42a19dc08fcf423
=======
  getRegistrosEstudioByMateriaId(id: number): RegistroEstudio[] {
    const materia = MOCK_MATERIAS.find(m => m.idMateria === id);
    if (materia) {
      return materia.registros;
    } else {
      return []; 
    }
  }

>>>>>>> origin/main
  getMateriaById(id: number): Materia | undefined {
    return MOCK_MATERIAS.find(materia => materia.idMateria === id);
  }

<<<<<<< HEAD
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
=======
  getSemestre(): Semestre {
    return MOCK_SEMESTRE;
  }

  getTareas(): Tarea[] {
    return MOCK_MATERIAS.flatMap(m => m.tareas);
  }
>>>>>>> origin/main
}
