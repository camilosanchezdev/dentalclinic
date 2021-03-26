import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { EspecialistasService } from '../../services/especialistas.service';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css'],
})
export class TurnoComponent implements OnInit {
  ariaValuenow: string = '10';
  styleValuenow: string = 'width: 10%;';
  firstStep: boolean = false;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  fourthStep: boolean = false;
  constructor(
    private turnosService: TurnosService,
    private especialistasService: EspecialistasService,
    private clientsService: ClientsService
  ) {}
  ngOnInit(): void {
    this.especialistasService.setValue(false);
    this.turnosService.setValue(false);
    this.clientsService.setValue(false);
    this.especialistasService.getValue().subscribe((value) => {
      if (value) {
        this.ariaValuenow = '40';
        this.styleValuenow = 'width: 40%';
      }
    });
    this.turnosService.getValue().subscribe((value) => {
      if (value) {
        this.ariaValuenow = '70';
        this.styleValuenow = 'width: 70%';
      }
    });
    this.clientsService.getValue().subscribe((value) => {
      if (value) {
        this.ariaValuenow = '100';
        this.styleValuenow = 'width: 100%';
      }
    });
  }
}
