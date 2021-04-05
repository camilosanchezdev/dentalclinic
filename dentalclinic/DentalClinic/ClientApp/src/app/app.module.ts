import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { TratamientosComponent } from './components/tratamientos/tratamientos.component';
import { TurnoComponent } from './components/turno/turno.component';
// Carousel
import { CarouselModule } from 'primeng/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EspecialistasComponent } from './components/especialistas/especialistas.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TurnoFormComponent } from './components/turno-form/turno-form.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { HttpClientModule } from '@angular/common/http';
// Forms
import { ReactiveFormsModule } from '@angular/forms';
// Toastr
import { ToastrModule } from 'ngx-toastr';
// Spinner
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// Redux NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './store/app.states';
import { AuthenticationEffects } from './store/effects/authentication.effects';

//Routes
import { Routing } from './app.routes';
import { GenerarturnosComponent } from './components/administracion/generarturnos/generarturnos.component';
import { ListadoturnosComponent } from './components/administracion/listadoturnos/listadoturnos.component';
import { MensajesComponent } from './components/administracion/mensajes/mensajes.component';
import { HomeadminComponent } from './components/administracion/home/home.component';
import { EspecialistasadmComponent } from './components/administracion/especialistas/especialistas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TratamientosComponent,
    TurnoComponent,
    EspecialistasComponent,
    CalendarComponent,
    TurnoFormComponent,
    ConfirmacionComponent,
    LoginComponent,
    DashboardComponent,
    GenerarturnosComponent,
    ListadoturnosComponent,
    MensajesComponent,
    HomeadminComponent,
    EspecialistasadmComponent,
  ],
  imports: [
    BrowserModule,
    Routing,
    CarouselModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModalModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ProgressSpinnerModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AuthenticationEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
