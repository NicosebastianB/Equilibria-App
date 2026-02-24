# Equilibria 📚✨

**Estudia mejor, vive mejor**

## Descripción del proyecto
Equilibria es una aplicación móvil desarrollada con **JavaScript + Ionic**, orientada a estudiantes universitarios colombianos. Su propósito es integrar la organización académica con el bienestar personal en una sola plataforma digital. A diferencia de las agendas tradicionales, Equilibria combina planificación académica con hábitos saludables, ofreciendo una herramienta integral para mejorar rendimiento y calidad de vida.

## Metodología
El desarrollo se realizará con **Scrum + Kanban**, organizando el trabajo en **7 sprints de dos semanas**:
- Cada sprint cubre un requerimiento funcional + diseño de interfaz asociado.
- El último sprint se dedica a decidir si se implementa la gamificación o se consolidan pruebas e integración.
- GitHub será el centro de colaboración, con ramas individuales para cada integrante y documentación en `/docs`.

## Roles del equipo
- **Carlos Mateo Chimunja (Interfaz):** pantallas y componentes en Ionic (`equilibria/src/pages/`, `equilibria/src/components/`).  
- **Mauricio Andrés Berrío (Base de datos):** estructura y consultas en SQL (`database/`).  
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

## ¿Cómo empezar a trabajar?
Para que cada uno de ustedes pueda trabajar en una copia del repositorio, deben ubicarse en la respectiva rama que les corresponde. Aqui hay un pequeño instructivo para que puedan ubicarse y empezar a trabajar.

**1. Clonar el repositorio**
Cada integrante debe clonar el repositorio desde GitHub a su computador:

(todos estos comandos deben realizarse en la consola de comandos del sistema, para windows es CMD)
Abre el simbolo del sistema o "cmd", ubicate en una carpeta de tu computador en la que quieras trabajar con:

`cd "Ruta de acceso de la carpeta"`

luego:

`git clone https://github.com/NicosebastianB/Equilibria-App.git`

`cd Equilibria-App`


este procedimiento les puede pedir que inicien sesión con su cuenta de github

posteriormente:

`git config --global user.email "tu_correo@example.com"`


este comando le permite a Git identificar quién eres y te permite realizar y subir cambios al repositorio. Reemplaza `tu_correo@example.com` con el correo que usaste para iniciar sesión en github.


**2. Ubicarse en su respectiva branch**
Cada integrante tiene una rama asignada. Para moverse a ella:
- Mauricio (Base de datos):
`git checkout database`
- Mateo (Interfaz):
`git checkout interface`
- Karen (Funcionalidad):
`git checkout functionality`


Verificar con:
`git branch`


El asterisco * indica la rama activa.


**3. Trabajar en el proyecto**
- Editar o crear archivos dentro de las carpetas correspondientes:
- Mauricio → database/
- Mateo → src/app/pages/, src/theme/, src/assets/
- Karen → src/app/services/, integración en src/app/
- Guardar los cambios normalmente en el editor (VS Code, etc.).


**4. Subir los cambios a su branch**
Cuando terminen una parte del trabajo:
- Verificar qué cambió:
`git status`
- Agregar los cambios:
`git add .`
- Hacer un commit con mensaje claro:
`git commit -m "feat: agregar servicio de materias"`

**recuerden que los commits hacen parte de la documentacion necesaria que necesita la app. Cuando hagan un cambio y lo suban, no olviden hacer el commit, sean especificos en lo que hicieron o agregaron"**


- Subir los cambios a su rama:

`git push origin nombre-de-la-rama`


- Ejemplo para Mauricio:
`git push origin database`


**✅ Resumen: Todos tienen acceso a todo el proyecto, pero trabajan en su rama para mantener orden**
- Cada rama es independiente, pero se sincroniza con el repositorio remoto en GitHub.
- Los cambios se suben con git add, git commit, y git push origin rama.

## 🔄 Mantener el proyecto sincronizado con GitHub


**1. Actualizar tu rama con los últimos cambios**:
Antes de empezar a trabajar, asegúrate de que tu copia local esté al día con el repositorio remoto:


`git checkout nombre-de-la-rama`


`git pull origin nombre-de-la-rama`


**Ejemplo para Mauricio:**


`git checkout database`
`git pull origin database`



**2. Verificar el estado de tu repositorio**:
Revisa qué archivos cambiaste o agregaste:


`git status`



**3. Guardar tus cambios**:
- Agregar los archivos modificados:

  
`git add .`


- Crear un commit con un mensaje claro:

  
`git commit -m "feat: agregar script de base de datos"`



**4. Subir tus cambios a GitHub**:
Envía tus cambios a tu rama en el repositorio remoto:


`git push origin nombre-de-la-rama`



**✅ Resumen**: 


- `git pull` → trae los cambios más recientes desde GitHub.
- `git add` + `git commit` → guarda tus modificaciones localmente.
- `git push` → sube tus cambios a tu rama en GitHub.
- Siempre trabaja en tu rama asignada para mantener orden en el proyecto.

## Documentación
- `docs/requerimientos.md`: especificación de requerimientos.  
- `docs/sprints.md`: planificación de sprints.  
- `docs/bibliografia.md`: referencias utilizadas.  

---
