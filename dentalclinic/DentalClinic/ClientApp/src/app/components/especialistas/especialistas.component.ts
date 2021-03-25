import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-especialistas',
  templateUrl: './especialistas.component.html',
  styleUrls: ['./especialistas.component.css'],
})
export class EspecialistasComponent implements OnInit {
  especialistas = [];
  constructor(private turnos: TurnosService, private router: Router) {
    turnos.getAllEspecialistas().subscribe(
      (data) => this.handleEspecialistas(data),
      (error) => console.log(error)
    );
  }
  handleEspecialistas(data): void {
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
  solicitarTurno(id_especialista): void {
    this.turnos.especialista = id_especialista;
    this.router.navigate(['turno/calendario']);
    console.log(id_especialista);
  }
  ngOnInit(): void {}
}
