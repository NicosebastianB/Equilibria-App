//mock data para tests

// unico usuario y principal administrador de la informacion
import { Estudiante } from '../models/estudiante';
// unica entidad semestre con proposito de contener la informacion de los semestres y calcular las semanas activas del semestre
import { Semestre } from '../models/semestre';

// materias que puede tener el estudiante
import { Materia } from '../models/materia';
// horario que pertenece a cada materia
import { Horario } from '../models/horario';
// tres cortes por defecto de la materia
import { Corte } from '../models/corte';
// unica actividad por defecto dentro de cada corte
import { Actividad } from '../models/actividad';
// calificable que pertenece a cada actividad, con su respectiva calificacion y peso
import { Calificable } from '../models/calificable';
// tareas que el estudiante puede agregar a una materia
import { Tarea } from '../models/tarea';

// plantilla base para crear un recordatorio personalizado
import { Recordatorio } from '../models/recordatorio';

// registro de estudio por materia
import { RegistroEstudio } from '../models/registroEstudio';


// mock data para tests


// Unico semestre completo
export const MOCK_SEMESTRE = new Semestre(1, "Semestre 2026-1", new Date("2026-01-20"), new Date("2026-05-23"), [
  { inicio: new Date("2026-03-01"), fin: new Date("2026-03-07") },
]);

MOCK_SEMESTRE.calcularSemanasTotales();

// Dos materias
export const MOCK_MATERIAS = [
  new Materia(1, "Matemáticas", "naranja", 3, "Profesor X", 3),
  new Materia(2, "Historia", "violeta", 2, "Profesor Y", 2)
];

// Horarios
MOCK_MATERIAS[0].horarios = [new Horario(1, 1, 1, 7, 3, "101")]; // Lunes 7-10
MOCK_MATERIAS[1].horarios = [new Horario(1, 2, 3, 14, 2, "202")]; // Miércoles 14-16

// Calificables
MOCK_MATERIAS[0].cortes[0].actividades[0].calificables.push(
  new Calificable(1, 1, 1, 1, "Calificable 1 Matemáticas", new Date("2026-02-15"), "día anterior", 4.2)
);
MOCK_MATERIAS[0].cortes[1].actividades[0].calificables.push(
  new Calificable(1, 2, 1, 2, "Calificable 2 Matemáticas", new Date("2026-03-15"), "día anterior", 3.8)
);
MOCK_MATERIAS[0].cortes[2].actividades[0].calificables.push(
  new Calificable(1, 3, 1, 3, "Calificable 3 Matemáticas", new Date("2026-04-15"), "día anterior", 4.5)
);

MOCK_MATERIAS[1].cortes[0].actividades[0].calificables.push(
  new Calificable(2, 1, 1, 1, "Calificable 1 Historia", new Date("2026-02-15"), "día anterior", 4.0)
);
MOCK_MATERIAS[1].cortes[1].actividades[0].calificables.push(
  new Calificable(2, 2, 1, 2, "Calificable 2 Historia", new Date("2026-03-15"), "día anterior", 3.5)
);
MOCK_MATERIAS[1].cortes[2].actividades[0].calificables.push(
  new Calificable(2, 3, 1, 3, "Calificable 3 Historia", new Date("2026-04-15"), "día anterior", 4.2)
);

// 🔑 Crear tareas usando el método de Materia
MOCK_MATERIAS[0].agregarTarea("Tarea 1 Matemáticas", new Date("2026-02-20"), "Daily");
MOCK_MATERIAS[1].agregarTarea("Tarea 1 Historia", new Date("2026-02-25"), "One day before");

// Registros de estudio
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(1, 1, new Date("2026-04-26"), 300));
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(2, 2, new Date("2026-04-26"), 200));


// Recordatorio
export const MOCK_RECORDATORIO = new Recordatorio(1, "Tomar la pastilla para el dolor de cabeza", "yellow", "diaria", "desactivado", true);

// Estudiante
export const MOCK_ESTUDIANTE = [
  new Estudiante("est_1", "Nico", "avatar1.png", MOCK_MATERIAS, [MOCK_RECORDATORIO], MOCK_SEMESTRE)
];
