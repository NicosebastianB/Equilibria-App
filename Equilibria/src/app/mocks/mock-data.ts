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
export const MOCK_SEMESTRE = new Semestre(
  1,
  "Semestre 2026-1",
  new Date(2026, 1, 2), // 2 febrero 2026
  new Date(2026, 4, 30), // 30 mayo 2026
  [
    { inicio: new Date(2026, 2, 30), fin: new Date(2026, 3, 4) } // 30 marzo - 4 abril
  ]
);


MOCK_SEMESTRE.calcularSemanasTotales();

// Cinco materias
export const MOCK_MATERIAS = [
  new Materia(1, "Matemáticas", "naranja", 3, "Profesor X", 3),
  new Materia(2, "Historia", "violeta", 2, "Profesor Y", 2),
  new Materia(3, "Física", "azul", 4, "Profesora Z", 3),
  new Materia(4, "Literatura", "verde", 2, "Profesora A", 2),
  new Materia(5, "Programación", "amarillo", 4, "Profesor B", 4)
];

// Horarios
MOCK_MATERIAS[0].horarios = [new Horario(1, 1, 1, 7, 3, "101")]; // Lunes 7-10
MOCK_MATERIAS[1].horarios = [new Horario(1, 2, 3, 14, 2, "202")]; // Miércoles 14-16
MOCK_MATERIAS[2].horarios = [new Horario(1, 3, 2, 12, 3, "303")]; // Martes 12-15
MOCK_MATERIAS[3].horarios = [new Horario(1, 4, 4, 10, 2, "404")]; // Jueves 10-12
MOCK_MATERIAS[4].horarios = [new Horario(1, 5, 5, 13, 4, "505")]; // Viernes 13-17

/// Actividad con calificables en Matemáticas
const actividadMat1 = new Actividad(1, 1001, 10011, "Parcial 1", 100, [
  new Calificable(1, 1001, 10011, 100111,  "Calificable 1 Matemáticas", new Date("2026-02-15"), "día anterior", 3.2)
]);

const actividadMat2 = new Actividad(1, 1002, 10021, "Parcial 2", 100, [
  new Calificable(1, 1002, 10021, 100211, "Calificable 2 Matemáticas", new Date("2026-03-15"), "día anterior", 3.8)
]);

const actividadMat3 = new Actividad(1, 1003, 10031, "Parcial 3", 100, [
  new Calificable(1, 1003, 10031, 100311, "Calificable 3 Matemáticas", new Date("2026-04-15"), "día anterior", 3.5)
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

// Materia 3: Física
const actividadFis1 = new Actividad(3, 3001, 30011, "Laboratorio 1", 100, [
  new Calificable(3, 3001, 30011, 300111, "Informe de laboratorio", new Date("2026-02-18"), "una semana antes", 2.8)
]);
const actividadFis2 = new Actividad(3, 3002, 30021, "Examen parcial", 100, [
  new Calificable(3, 3002, 30021, 300211, "Parcial 1", new Date("2026-03-20"), "dos días antes", 3.2)
]);
const actividadFis3 = new Actividad(3, 3003, 30031, "Proyecto", 100, [
  new Calificable(3, 3003, 30031, 300311, "Entregable final", new Date("2026-04-22"), "tres días antes", 4.7)
]);
MOCK_MATERIAS[2].cortes[0].actividades = [actividadFis1];
MOCK_MATERIAS[2].cortes[1].actividades = [actividadFis2];
MOCK_MATERIAS[2].cortes[2].actividades = [actividadFis3];
MOCK_MATERIAS[2].cortes.forEach(c => c.calcularDefinitiva());

// Materia 4: Literatura
const actividadLit1 = new Actividad(4, 4001, 40011, "Ensayo 1", 100, [
  new Calificable(4, 4001, 40011, 400111, "Ensayo analítico", new Date("2026-02-22"), "tres días antes", 4.5)
]);
const actividadLit2 = new Actividad(4, 4002, 40021, "Lectura crítica", 100, [
  new Calificable(4, 4002, 40021, 400211, "Reseña literaria", new Date("2026-03-25"), "un día antes", 5.0)
]);
const actividadLit3 = new Actividad(4, 4003, 40031, "Presentación", 100, [
  new Calificable(4, 4003, 40031, 400311, "Presentación oral", new Date("2026-04-12"), "dos días antes", 4.3)
]);
MOCK_MATERIAS[3].cortes[0].actividades = [actividadLit1];
MOCK_MATERIAS[3].cortes[1].actividades = [actividadLit2];
MOCK_MATERIAS[3].cortes[2].actividades = [actividadLit3];
MOCK_MATERIAS[3].cortes.forEach(c => c.calcularDefinitiva());

// Materia 5: Programación
const actividadProg1 = new Actividad(5, 5001, 50011, "Tarea práctica", 100, [
  new Calificable(5, 5001, 50011, 500111, "Algoritmo inicial", new Date("2026-02-28"), "dos días antes", 1.4)
]);
const actividadProg2 = new Actividad(5, 5002, 50021, "Proyecto de grupo", 100, [
  new Calificable(5, 5002, 50021, 500211, "Demo funcional", new Date("2026-03-30"), "tres días antes", 3.6)
]);
const actividadProg3 = new Actividad(5, 5003, 50031, "Examen final", 100, [
  new Calificable(5, 5003, 50031, 500311, "Prueba final", new Date("2026-04-18"), "un día antes", 3.9)
]);
MOCK_MATERIAS[4].cortes[0].actividades = [actividadProg1];
MOCK_MATERIAS[4].cortes[1].actividades = [actividadProg2];
MOCK_MATERIAS[4].cortes[2].actividades = [actividadProg3];
MOCK_MATERIAS[4].cortes.forEach(c => c.calcularDefinitiva());

// 🔑 Crear tareas usando el método de Materia
MOCK_MATERIAS[0].agregarTarea("Tarea 1 Matemáticas", new Date("2026-02-20"), "Daily");
MOCK_MATERIAS[1].agregarTarea("Tarea 1 Historia", new Date("2026-02-25"), "One day before");
MOCK_MATERIAS[2].agregarTarea("Laboratorio de física", new Date("2026-03-02"), "weekly");
MOCK_MATERIAS[3].agregarTarea("Ensayo de literatura", new Date("2026-03-10"), "once");
MOCK_MATERIAS[4].agregarTarea("Debug de proyecto", new Date("2026-04-01"), "daily");

// Registros de estudio dinámicos
// 📙 Física
MOCK_MATERIAS[2].registros.push(new RegistroEstudio(17, 3, new Date("2026-02-18"), 100));
MOCK_MATERIAS[2].registros.push(new RegistroEstudio(18, 3, new Date("2026-02-25"), 140));
MOCK_MATERIAS[2].registros.push(new RegistroEstudio(19, 3, new Date("2026-03-02"), 80));
MOCK_MATERIAS[2].registros.push(new RegistroEstudio(20, 3, new Date("2026-03-09"), 160));
MOCK_MATERIAS[2].registros.push(new RegistroEstudio(21, 3, new Date("2026-04-16"), 120));
MOCK_MATERIAS[2].registros.push(new RegistroEstudio(22, 3, new Date("2026-04-23"), 90));
MOCK_MATERIAS[2].registros.push(new RegistroEstudio(23, 3, new Date("2026-05-30"), 110));
MOCK_MATERIAS[2].registros.push(new RegistroEstudio(24, 3, new Date("2026-05-06"), 130));

// 📕 Literatura
MOCK_MATERIAS[3].registros.push(new RegistroEstudio(25, 4, new Date("2026-02-19"), 70));
MOCK_MATERIAS[3].registros.push(new RegistroEstudio(26, 4, new Date("2026-02-26"), 90));
MOCK_MATERIAS[3].registros.push(new RegistroEstudio(27, 4, new Date("2026-03-03"), 50));
MOCK_MATERIAS[3].registros.push(new RegistroEstudio(28, 4, new Date("2026-03-10"), 110));
MOCK_MATERIAS[3].registros.push(new RegistroEstudio(29, 4, new Date("2026-04-17"), 95));
MOCK_MATERIAS[3].registros.push(new RegistroEstudio(30, 4, new Date("2026-04-24"), 85));
MOCK_MATERIAS[3].registros.push(new RegistroEstudio(31, 4, new Date("2026-05-31"), 120));
MOCK_MATERIAS[3].registros.push(new RegistroEstudio(32, 4, new Date("2026-05-07"), 100));

// 📗 Programación
MOCK_MATERIAS[4].registros.push(new RegistroEstudio(33, 5, new Date("2026-02-20"), 180));
MOCK_MATERIAS[4].registros.push(new RegistroEstudio(34, 5, new Date("2026-02-27"), 200));
MOCK_MATERIAS[4].registros.push(new RegistroEstudio(35, 5, new Date("2026-03-04"), 220));
MOCK_MATERIAS[4].registros.push(new RegistroEstudio(36, 5, new Date("2026-03-11"), 260));
MOCK_MATERIAS[4].registros.push(new RegistroEstudio(37, 5, new Date("2026-03-18"), 190));
MOCK_MATERIAS[4].registros.push(new RegistroEstudio(38, 5, new Date("2026-03-25"), 210));
MOCK_MATERIAS[4].registros.push(new RegistroEstudio(39, 5, new Date("2026-04-01"), 230));
MOCK_MATERIAS[4].registros.push(new RegistroEstudio(40, 5, new Date("2026-04-08"), 250));

// 📘 Matemáticas
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(1, 1, new Date("2026-02-20"), 120)); 
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(2, 1, new Date("2026-02-27"), 180)); 
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(3, 1, new Date("2026-03-05"), 300)); 
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(4, 1, new Date("2026-03-12"), 90));  
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(5, 1, new Date("2026-04-08"), 50)); 
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(6, 1, new Date("2026-04-19"), 300));
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(7, 1, new Date("2026-05-01"), 120)); 
MOCK_MATERIAS[0].registros.push(new RegistroEstudio(8, 1, new Date("2026-05-25"), 250)); 

// 📗 Historia
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(9, 2, new Date("2026-02-21"), 60));
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(10, 2, new Date("2026-02-28"), 45)); 
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(11, 2, new Date("2026-03-05"), 20)); 
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(12, 2, new Date("2026-03-13"), 150)); 
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(13, 2, new Date("2026-04-20"), 200)); 
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(14, 2, new Date("2026-04-27"), 80));
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(15, 2, new Date("2026-05-03"), 100));
MOCK_MATERIAS[1].registros.push(new RegistroEstudio(16, 2, new Date("2026-05-10"), 120));


// Recordatorio
export const MOCK_RECORDATORIO = new Recordatorio(1, "Tomar la pastilla para el dolor de cabeza", "yellow", "diaria", "desactivado", true);

// Estudiante
export const MOCK_ESTUDIANTE = [
  new Estudiante("est_1", "Nico", "avatar1.png", MOCK_MATERIAS, [MOCK_RECORDATORIO], MOCK_SEMESTRE)
];
