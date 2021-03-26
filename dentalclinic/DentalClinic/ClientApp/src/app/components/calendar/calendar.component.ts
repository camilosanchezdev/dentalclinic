import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { formatDate, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { TurnosService } from '../../services/turnos.service';
import { ClientsService } from '../../services/clients.service';
import { EspecialistasService } from '../../services/especialistas.service';
import { Router } from '@angular/router';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  green: {
    primary: '#2bad21',
    secondary: '#e5fae3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
registerLocaleData(localeEs);
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  currentDate: string = '';
  locale: string = 'es';
  checkoutForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private modal: NgbModal,
    private turnoService: TurnosService,
    private clientsService: ClientsService,
    private especialistasService: EspecialistasService,
    private router: Router,
    private toastr: ToastrService
  ) {
    // if (especialistasService.especialista === 0) {
    //   this.router.navigate(['turnos']);
    // }
    especialistasService
      .getEspecialista(this.especialistasService.especialista)
      .subscribe(
        (data) => this.handleEspecialista(data),
        (error) => console.log(error)
      );
    turnoService.getTurnos(this.especialistasService.especialista).subscribe(
      (data) => this.handleTurno(data),
      (error) => console.log(error)
    );
  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  especialista: string = '';

  handleEspecialista(data): void {
    this.especialista = data.name;
  }
  handleTurno(data): void {
    data.forEach((element) => {
      this.events.push({
        id: element.id_turno,
        start: new Date(element.horario),
        title: element.horario.substring(11, 16) + ' - Solicitar turno',
        color: colors.green,
        actions: this.actions,
      });
    });
    this.refresh.next();
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    this.currentDate = formatDate(event.start, 'dd/MM/yyyy HH:mm', 'es');
    this.turnoService.turnoSelected = formatDate(
      event.start,
      'dd/MM/yyyy HH:mm',
      'es'
    );
    this.turnoService.id_turno = new Number(event.id);
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  onSubmit() {
    if (this.checkoutForm.value.dni < 0) {
      this.toastr.error('', 'Debe ingresar un DNI válido');
    } else {
      this.clientsService.getClient(this.checkoutForm.value.dni).subscribe(
        (data) => this.handleClient(data)
        //(error) => console.log(error) //this.handleError(error)
      );
    }
  }
  // handleError(error): void {
  //   this.modal.dismissAll(this.modalContent);
  //   this.router.navigate(['turno/formulario']);
  // }
  handleClient(data): void {
    if (data.status === 'error') {
      this.clientsService.clientExist = false;
    } else {
      this.clientsService.clientExist = true;
      this.clientsService.id_client = data.id_client;
      this.clientsService.modelClient = {
        dni: data.dni,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address: data.address,
      };
    }
    this.clientsService.dniSelected = this.checkoutForm.value.dni;
    this.turnoService.setValue(true);
    this.modal.dismissAll(this.modalContent);
    this.router.navigate(['turnos/formulario']);
    // if (data === 'NO') {
    //   console.log('NO TOCO');
    // } else {
    //   console.log('Hay un usuario');
    //   this.toastr.success('', 'Si');
    // }
  }
  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      dni: [null, Validators.required],
    });
  }
}
