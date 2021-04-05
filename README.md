# DentalClinic

DentalClinic - ASP .NET CORE, Angular 10, PostgresSQL 11, NgRx (Redux).

## Proyecto

Sistema creado para proyecto de clínica dental.<br/>
Landing page con encabezado, menú de páginas, presentación, mapa y formulario de contacto.<br/>
Página "Nuestra clínica" con información de la institución.<br/>
Página "Tratamientos" con los servicios ofrecidos por la clínica dental.<br/>
Página "Turnos" para solicitar turno de atención.<br/>

### Panel de administración

Panel de administración para usuarios de rol Administrador y Especialista, con acceso restringido por Login.

- Generación de JSON Web Token (JWT)
- NgRx validación de token al iniciar sesión y al refrescar el sitio.
- Generación de nuevos turnos
- Listado de turnos asignados
- Mensajes recibidos a través del sitio
- ABM de especialistas

### Sistema de turnos

Permite a los usuarios seleccionar especialista con diferentes horarios y días de atención.<br/>
El usuario puede elegir el día y horario en el calendario.<br/>
Se solicita al usuario el número de DNI. <br/>

- En caso de ser usuario registrado aparecerán sus datos para confirmación.
- En caso de no ser usuario registrado deberá completar el formulario de inscripción.
  <br/>
  Una vez confirmada la información del usuario, se completará la asignación del turno.<br/>
  El usuario tiene la posibilidad de cambiar el horario y día del turno o cancelarlo.<br/>
  Cada turno ocupado desaparecerá del Calendario de turnos disponibles.
  <br/>

### Demo

Demo | <a href="https://dentalclinicweb.azurewebsites.net/">DentalClinic on Azure</a>
<br/>

### Screenshots

<img src="screenshots/screenshot-1.png" />
<img src="screenshots/screenshot-4.png" />
<img src="screenshots/screenshot-3.png" />
<img src="screenshots/screenshot2.png" />
<img src="screenshots/screenshot5.png" />
