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
//Routes
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '#contacto', component: HomeComponent },
  { path: 'nosotros', component: AboutComponent },
  { path: 'tratamientos', component: TratamientosComponent },
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
