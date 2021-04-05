import { Routes, RouterModule } from '@angular/router';
//import { AuthenticationGuardService } from './services/authentication-guard.service';

// components
import { AboutComponent } from './components/about/about.component';
import { TratamientosComponent } from './components/tratamientos/tratamientos.component';
import { TurnoComponent } from './components/turno/turno.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EspecialistasComponent } from './components/especialistas/especialistas.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TurnoFormComponent } from './components/turno-form/turno-form.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { AuthenticationGuardPreventService } from './services/authentication-guard-prevent.service';
import { HomeadminComponent } from './components/administracion/home/home.component';
import { GenerarturnosComponent } from './components/administracion/generarturnos/generarturnos.component';
import { ListadoturnosComponent } from './components/administracion/listadoturnos/listadoturnos.component';
import { MensajesComponent } from './components/administracion/mensajes/mensajes.component';
import { EspecialistasadmComponent } from './components/administracion/especialistas/especialistas.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '#contacto', component: HomeComponent },
  { path: 'nosotros', component: AboutComponent },
  { path: 'tratamientos', component: TratamientosComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthenticationGuardPreventService],
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthenticationGuardService],
    children: [
      {
        path: '',
        component: HomeadminComponent,
      },
      {
        path: 'generar-turnos',
        component: GenerarturnosComponent,
      },
      {
        path: 'listado-turnos',
        component: ListadoturnosComponent,
      },
      {
        path: 'mensajes',
        component: MensajesComponent,
      },
      {
        path: 'especialistas',
        component: EspecialistasadmComponent,
      },
    ],
  },
  {
    path: 'turnos',
    component: TurnoComponent,
    children: [
      {
        path: '',
        component: EspecialistasComponent,
      },

      {
        path: 'calendario',
        component: CalendarComponent,
      },
      {
        path: 'formulario',
        component: TurnoFormComponent,
      },
      {
        path: 'confirmacion',
        component: ConfirmacionComponent,
      },
    ],
  },
];

export const Routing = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled',
});
