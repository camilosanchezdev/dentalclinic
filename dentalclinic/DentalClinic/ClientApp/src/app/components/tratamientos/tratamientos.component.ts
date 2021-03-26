import { Component, OnInit } from '@angular/core';
import { EspecialistasService } from '../../services/especialistas.service';
import { TurnosService } from '../../services/turnos.service';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css'],
})
export class TratamientosComponent implements OnInit {
  constructor(
    private especialistasService: EspecialistasService,
    private turnosService: TurnosService,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.especialistasService.setValue(false);
    this.turnosService.setValue(false);
    this.clientsService.setValue(false);
  }
}
