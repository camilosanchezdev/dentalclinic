import { EspecialistasService } from 'src/app/services/especialistas.service';
import { ClientsService } from '../../services/clients.service';
import { TurnosService } from '../../services/turnos.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css'],
})
export class ConfirmacionComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  name_client: string = '';
  turno_asignado: string = '';
  especialista: string = '';
  constructor(
    private clientService: ClientsService,
    private turnoService: TurnosService,
    private especialistasService: EspecialistasService,
    private router: Router,
    private modal: NgbModal
  ) {
    this.name_client = this.clientService.name_client;
    this.turno_asignado = this.turnoService.turnoSelected;
    this.especialista = this.especialistasService.especialista_name;
    // if (
    //   especialistasService.especialista === 0 ||
    //   turnoService.id_turno === 0 ||
    //   this.clientService.name_client === ''
    // ) {
    //   this.router.navigate(['turnos']);
    // }
  }

  cambiarTurno(): void {
    this.turnoService.newTurno(this.turnoService.id_turno, 0).subscribe((
      data //console.log(data),
    ) => (error) => console.log(error));
    this.router.navigate(['turnos/calendario']);
  }
  cancelarTurno(): void {
    this.modal.open(this.modalContent, { size: 'md' });
  }
  cancelarTurnoConfirm(): void {
    this.modal.dismissAll(this.modalContent);

    this.turnoService.newTurno(this.turnoService.id_turno, 0).subscribe((
      data //console.log(data),
    ) => (error) => console.log(error));
    this.especialistasService.setValue(false);
    this.turnoService.setValue(false);
    this.clientService.setValue(false);
    this.router.navigate(['turnos']);
  }
  ngOnInit(): void {}
}
