# 📌✅Requerimientos del Software. App Equilibria.
Carlos Mateo Chimunja, Mauricio Andrés Berrío, Karen Sofía Rodríguez

## ⭐Introducción
Propósito: Documentar los requerimientos funcionales y no funcionales de la aplicación Equilibria, una agenda saludable inteligente para estudiantes universitarios.

Alcance: Aplicación android móvil que integra la organización académica con el bienestar personal

Definiciones:

Pomodoro: Técnica de productividad basada en intervalos de trabajo y descanso

Referencias: Documentación Android, Ionic Framework, Pressman & Maxim


## 🔎📃Descripción general
Perspectiva del producto: Aplicación móvil independiente, con almacenamiento local.
Funciones principales: Registro de materias, gestión de tareas y exámenes, cálculo de horas de estudio, temporizador pomodoro, recordatorios de bienestar, estadísticas.
Usuarios: Estudiantes universitarios, instituciones educativas como clientes secundarios
Restricciones: Compatibilidad con android, interfaz intuitiva, almacenamiento seguro en el dispositivo
Suposiciones: El estudiante ingresa datos académicos manualmente; la app no se conecta a sistemas institucionales externos.



## 📌📝Requerimientos específicos


### 📱💡Requerimientos funcionales

| Código | Descripción | Prioridad | Entrada | Salida | Restricciones |
|--------|-------------|-----------|---------|--------|---------------|
| RF-01 | Registro de asignaturas y horarios | Alta | Datos de materias, créditos, horarios | Agenda con asignaturas | Edición y eliminación permitidas |
| RF-02 | Gestión de tareas, exámenes y calificaciones | Alta | Actividades con notas y porcentajes | Listado organizado + cálculo de promedios | Configurable según criterios |
| RF-03 | Cálculo automático de horas de estudio | Media | Créditos académicos | Recomendación semanal | Basado en reglas predefinidas |
| RF-04 | Planificador Pomodoro y modo estudio | Media | Selección de materia y temporizador | Alertas y registro de tiempo | Integra estadísticas |
| RF-05 | Recordatorios personalizados | Alta | Configuración del usuario | Notificaciones | Personalización de frecuencia y tipo |
| RF-06 | Estadísticas académicas | Alta | Datos recopilados | Gráficas y reportes | Accesible desde el menú principal |

### 💾💡Requerimientos no funcionales

| Código | Descripción | Prioridad | Restricciones |
|--------|-------------|-----------|---------------|
| RNF-01 | Almacenamiento interno | Alta | Protección contra pérdida y accesos no autorizados | 
| RNF-02 | Usabilidad de la interfaz | Alta | Consistencia en colores/tipografía, diseño responsivo |
| RNF-03 | Portabilidad android | Media | Compatibilidad con android, smartphones y tablets |
