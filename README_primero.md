# Equilibria 📚✨

## Descripción del proyecto
Equilibria es una aplicación móvil desarrollada con **JavaScript + Ionic** pensada para estudiantes universitarios colombianos. Su objetivo es ayudar a organizar asignaturas, tareas y tiempos de estudio, integrando herramientas de productividad (como el temporizador Pomodoro) y estadísticas académicas para mejorar el rendimiento y el bienestar.

## Objetivos principales
- Registrar asignaturas y horarios.
- Gestionar tareas, exámenes y calificaciones.
- Calcular automáticamente horas de estudio según créditos.
- Implementar un planificador Pomodoro.
- Configurar recordatorios personalizados.
- Mostrar estadísticas académicas y de bienestar.
- (Opcional) Añadir gamificación para motivar al estudiante.

## Roles del equipo
- **Mateo (Interfaz)**  
  Encargado de diseñar y desarrollar las pantallas de la aplicación en Ionic.  
  Trabajará principalmente en la carpeta `src/pages/` y `src/components/`.

- **Mauricio (Base de datos)**  
  Responsable de crear y mantener la estructura de la base de datos (tablas, relaciones, consultas).  
  Trabajará en la carpeta `database/` y en el servicio `dbService.js`.

- **Karen (Funcionalidad)**  
  Encargada de implementar la lógica de negocio y las funciones que conectan la interfaz con la base de datos.  
  Trabajará en la carpeta `src/services/` y en la integración con `app.js`.

## Flujo de trabajo
1. **Mauricio** define la base de datos (ej. tabla `materias`).  
2. **Karen** implementa funciones que usan esas tablas (ej. `addMateria(nombre, fecha)`).  
3. **Mateo** diseña pantallas que llaman a esas funciones y muestran los datos al usuario.  
4. Cada integrante trabaja en su **rama de GitHub** (`database`, `functionality`, `interface`) y al final de cada sprint se integran los cambios en `main`.

## Documentación
- `docs/requerimientos.md`: especificación de requerimientos.  
- `docs/sprints.md`: planificación de sprints.  
- `docs/bibliografia.md`: referencias utilizadas.  

## Instalaciones necesarias
Cada integrante debe tener en su computador:
- **Git** (para clonar y subir cambios al repositorio).  
- **Node.js + npm** (para ejecutar proyectos en JavaScript).  
- **Ionic CLI** (`npm install -g @ionic/cli`).  
- **Android Studio** (para probar la app en emuladores).  
- **Visual Studio Code** (editor recomendado).  

---
