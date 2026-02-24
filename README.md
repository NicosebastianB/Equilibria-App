# Equilibria 📚✨

**Estudia mejor, vive mejor**

## Descripción del proyecto
Equilibria es una aplicación móvil desarrollada con **JavaScript + Ionic**, orientada a estudiantes universitarios colombianos. Su propósito es integrar la organización académica con el bienestar personal en una sola plataforma digital. A diferencia de las agendas tradicionales, Equilibria combina planificación académica con hábitos saludables, ofreciendo una herramienta integral para mejorar rendimiento y calidad de vida.

## Antecedentes
Actualmente existen aplicaciones de agenda y aplicaciones de bienestar, pero pocas integran ambas experiencias en un solo sistema. Equilibria se diferencia al ofrecer:
- Registro de asignaturas, créditos y horarios.
- Cálculo automático de horas de estudio.
- Planificador Pomodoro con estadísticas por materia.
- Recordatorios académicos y de autocuidado.
- Métricas de productividad y bienestar.
- Elementos opcionales de gamificación.

## Justificación
La aplicación responde a dos perfiles de estudiantes:
- **Descuidados:** necesitan recordatorios claros y sencillos para organizar su vida académica.  
- **Organizados:** buscan estadísticas, métricas y seguimiento detallado para optimizar su rendimiento.  

Equilibria ayuda a mantener un balance entre estudio y salud, convirtiéndose en un aliado práctico para la vida universitaria.

## Nombre, logo y slogan
- **Nombre:** *Equilibria*, refleja el balance entre responsabilidades académicas y bienestar personal.  
- **Logo:** una balanza con un gorro de graduación y un corazón, simbolizando estudio y autocuidado.  
- **Slogan:** *Estudia mejor, vive mejor*.  

## Público objetivo
Principalmente estudiantes universitarios colombianos, con posibilidad de expansión hacia instituciones educativas que deseen recomendar la aplicación como herramienta de apoyo.

## Metodología
El desarrollo se realizará con **Scrum + Kanban**, organizando el trabajo en **7 sprints de dos semanas**:
- Cada sprint cubre un requerimiento funcional + diseño de interfaz asociado.
- El último sprint se dedica a decidir si se implementa la gamificación o se consolidan pruebas e integración.
- GitHub será el centro de colaboración, con ramas individuales para cada integrante y documentación en `/docs`.

## Roles del equipo
- **Carlos Mateo Chimunja (Interfaz):** pantallas y componentes en Ionic (`src/pages/`, `src/components/`).  
- **Mauricio Andrés Berrío (Base de datos):** estructura y consultas en SQL (`database/`, `dbService.js`).  
- **Karen Sofía Rodríguez (Funcionalidad):** lógica de negocio y conexión entre BD e interfaz (`src/services/`, `app.js`).  

## Requerimientos principales
- **RF-01:** Registro de asignaturas y horarios.  
- **RF-02:** Gestión de tareas, exámenes y calificaciones.  
- **RF-03:** Cálculo automático de horas de estudio.  
- **RF-04:** Planificador Pomodoro y modo de estudio.  
- **RF-05:** Recordatorios personalizados.  
- **RF-06:** Estadísticas académicas y de bienestar.  
- **RF-07 (Opcional):** Gamificación de hábitos.  

## Requerimientos no funcionales
- **RNF-01:** Almacenamiento interno sin necesidad de internet.  
- **RNF-02:** Interfaz intuitiva y responsiva.  
- **RNF-03:** Portabilidad en dispositivos Android (Android 10 o superior).  

## Instalaciones necesarias
Cada integrante debe tener en su computador:
- **Git** (control de versiones).  
- **Node.js + npm** (ejecución de proyectos JS).  
- **Ionic CLI** (`npm install -g @ionic/cli`).  
- **Android Studio** (emuladores y compilación).  
- **Visual Studio Code** (editor recomendado).  

## Documentación
- `docs/requerimientos.md`: especificación de requerimientos.  
- `docs/sprints.md`: planificación de sprints.  
- `docs/bibliografia.md`: referencias utilizadas.  

---
