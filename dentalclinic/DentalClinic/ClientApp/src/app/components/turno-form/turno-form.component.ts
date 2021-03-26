import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { ClientsService } from '../../services/clients.service';
import { EspecialistasService } from '../../services/especialistas.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-turno-form',
  templateUrl: './turno-form.component.html',
  styleUrls: ['./turno-form.component.css'],
})
export class TurnoFormComponent implements OnInit {
  checkoutForm: FormGroup;
  especialista_name: string = '';
  turno_selected: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private turnoService: TurnosService,
    private clientService: ClientsService,
    private especialistasService: EspecialistasService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.especialista_name = this.especialistasService.especialista_name;
    // if (
    //   especialistasService.especialista === 0 ||
    //   turnoService.id_turno === 0
    // ) {
    //   this.router.navigate(['turnos']);
    // }
    this.turno_selected = this.turnoService.turnoSelected;
    this.checkoutForm = this.formBuilder.group({
      dni: new FormControl(
        { value: this.clientService.dniSelected, disabled: true },
        Validators.required
      ),
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
    });
    if (this.clientService.clientExist) {
      this.checkoutForm.patchValue({
        name: this.clientService.modelClient.name,
        lastname: this.clientService.modelClient.lastname,
        email: this.clientService.modelClient.email,
        phone: this.clientService.modelClient.phone,
        address: this.clientService.modelClient.address,
      });
    }
  }

  ngOnInit(): void {}
  onSubmit(): void {
    this.clientService.name_client =
      this.checkoutForm.value.name + ' ' + this.checkoutForm.value.lastname;
    let formData: FormData = new FormData();
    formData.append('dni', this.checkoutForm.controls['dni'].value);
    formData.append('name', this.checkoutForm.value.name);
    formData.append('lastname', this.checkoutForm.value.lastname);
    formData.append('address', this.checkoutForm.value.address);
    formData.append('phone', this.checkoutForm.value.phone);
    formData.append('email', this.checkoutForm.value.email);
    if (!this.clientService.clientExist) {
      // Insert
      this.clientService.newClient(formData).subscribe((data) => {
        this.handleData(data);
      });
    } else {
      //Update
      this.clientService.updateClient(formData).subscribe((data) => {
        this.handleData(data);
      });
    }
  }
  handleTurno(data): void {
    if (data.status === 'ok') {
      this.router.navigate(['turnos/confirmacion']);
    }
  }
  handleData(data): void {
    if (data.status === 'ok') {
      // Store Turno - Update
      this.clientService.setValue(true);
      this.turnoService
        .newTurno(this.turnoService.id_turno, this.clientService.id_client)
        .subscribe((data) => {
          this.handleTurno(data);
        });
      this.toastr.success('', 'Turno agendado');
    }
  }
}
