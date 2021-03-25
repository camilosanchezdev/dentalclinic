import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css'],
})
export class TurnoComponent implements OnInit {
  constructor(private turnos: TurnosService) {}
  ngOnInit(): void {}
}
