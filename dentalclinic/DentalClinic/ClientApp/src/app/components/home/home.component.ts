import { Component, OnInit } from '@angular/core';
import { EspecialistasService } from '../../services/especialistas.service';
import { TurnosService } from '../../services/turnos.service';
import { ClientsService } from '../../services/clients.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  checkoutForm: FormGroup;
  constructor(
    private especialistasService: EspecialistasService,
    private turnosService: TurnosService,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      interes: [null, Validators.required],
      consulta: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.especialistasService.setValue(false);
    this.turnosService.setValue(false);
    this.clientsService.setValue(false);
  }
  onSubmit(): void {
    console.log();
  }
}
