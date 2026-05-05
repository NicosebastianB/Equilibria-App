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

/// Actividad con calificables en Matemáticas
const actividadMat1 = new Actividad(1, 1001, 10011, "Parcial 1", 100, [
  new Calificable(1, 1001, 10011, 100111,  "Calificable 1 Matemáticas", new Date("2026-02-15"), "día anterior", 4.2)
]);

const actividadMat2 = new Actividad(1, 1002, 10021, "Parcial 2", 100, [
  new Calificable(1, 1002, 10021, 100211, "Calificable 2 Matemáticas", new Date("2026-03-15"), "día anterior", 3.8)
]);

const actividadMat3 = new Actividad(1, 1003, 10031, "Parcial 3", 100, [
  new Calificable(1, 1003, 10031, 100311, "Calificable 3 Matemáticas", new Date("2026-04-15"), "día anterior", 4.5)
]);

MOCK_MATERIAS[0].cortes[0].actividades = [actividadMat1];
MOCK_MATERIAS[0].cortes[1].actividades = [actividadMat2];
MOCK_MATERIAS[0].cortes[2].actividades = [actividadMat3];

MOCK_MATERIAS[0].cortes.forEach(c => c.calcularDefinitiva());

// Actividad con calificables en Historia
const actividadHist1 = new Actividad(2, 2001, 20011, "Parcial 1", 100, [
  new Calificable(2, 2001, 20011, 200111, "Calificable 1 Historia", new Date("2026-02-15"), "día anterior", 4.0)
]);

const actividadHist2 = new Actividad(2, 2002, 20021, "Parcial 2", 100, [
  new Calificable(2, 2002, 20021, 200211, "Calificable 2 Historia", new Date("2026-03-15"), "día anterior", 3.5)
]);

const actividadHist3 = new Actividad(2, 2003, 20031, "Parcial 3", 100, [
  new Calificable(2, 2003, 20031, 200311, "Calificable 3 Historia", new Date("2026-04-15"), "día anterior", 4.2)
]);

MOCK_MATERIAS[1].cortes[0].actividades = [actividadHist1];
MOCK_MATERIAS[1].cortes[1].actividades = [actividadHist2];
MOCK_MATERIAS[1].cortes[2].actividades = [actividadHist3];

MOCK_MATERIAS[1].cortes.forEach(c => c.calcularDefinitiva());



// 🔑 Crear tareas usando el método de Materia
MOCK_MATERIAS[0].agregarTarea("Tarea 1 Matemáticas", new Date("2026-02-20"), "Daily");
MOCK_MATERIAS[1].agregarTarea("Tarea 1 Historia", new Date("2026-02-25"), "One day before");

// Registros de estudio dinámicos

// 📘 Matemáticas
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(1, 1, new Date("2026-04-20"), 120)); // Semana 1
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(2, 1, new Date("2026-04-27"), 180)); // Semana 2
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(3, 1, new Date("2026-05-05"), 300)); // Semana 3
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(4, 1, new Date("2026-05-12"), 90));  // Semana 4
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(5, 1, new Date("2026-05-19"), 240)); // Semana 5

// 📗 Historia
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(6, 2, new Date("2026-04-21"), 60));  // Semana 1
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(7, 2, new Date("2026-04-28"), 45));  // Semana 2
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(8, 2, new Date("2026-05-05"), 20));  // Semana 3
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(9, 2, new Date("2026-05-13"), 150)); // Semana 4
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(10, 2, new Date("2026-05-20"), 200)); // Semana 5


// Recordatorio
export const MOCK_RECORDATORIO = new Recordatorio(1, "Tomar la pastilla para el dolor de cabeza", "yellow", "diaria", "desactivado", true);

// Estudiante
export const MOCK_ESTUDIANTE = [
  new Estudiante("est_1", "Nico", "avatar1.png", MOCK_MATERIAS, [MOCK_RECORDATORIO], MOCK_SEMESTRE)
];
