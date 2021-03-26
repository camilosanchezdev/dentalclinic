import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { EspecialistasService } from '../../services/especialistas.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-especialistas',
  templateUrl: './especialistas.component.html',
  styleUrls: ['./especialistas.component.css'],
})
export class EspecialistasComponent implements OnInit {
  progressSpinner: boolean = false;
  especialistas = [];
  constructor(
    private turnos: TurnosService,
    private especialistasService: EspecialistasService,
    private router: Router
  ) {
    this.progressSpinner = true;
    especialistasService.getAllEspecialistas().subscribe(
      (data) => this.handleEspecialistas(data),
      (error) => console.log(error)
    );
  }
  handleEspecialistas(data): void {
    this.progressSpinner = false;
    this.especialistas = data;
  }
  dayOfWeek(day) {
    switch (day) {
      case 0:
        return 'Lunes';
      case 1:
        return 'Martes';
      case 2:
        return 'Miércoles';
      case 3:
        return 'Jueves';
      case 4:
        return 'Viernes';
      default:
        break;
    }
  }
  solicitarTurno(id_especialista, name): void {
    this.especialistasService.especialista = id_especialista;
    this.especialistasService.especialista_name = name;
    this.especialistasService.setValue(true);
    this.router.navigate(['turnos/calendario']);
  }
  ngOnInit(): void {}
}
