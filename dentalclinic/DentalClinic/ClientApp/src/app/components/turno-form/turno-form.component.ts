import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-turno-form',
  templateUrl: './turno-form.component.html',
  styleUrls: ['./turno-form.component.css'],
})
export class TurnoFormComponent implements OnInit {
  checkoutForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private turno: TurnosService) {
    this.checkoutForm = this.formBuilder.group({
      dni: new FormControl({ value: 0, disabled: false }),
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  ngOnInit(): void {}
  onSubmit(): void {
    // if nuevo usuario | existente
    let formData: FormData = new FormData();
    formData.append('dni', this.checkoutForm.value.dni);
    formData.append('name', this.checkoutForm.value.name);
    formData.append('lastname', this.checkoutForm.value.lastname);
    formData.append('address', this.checkoutForm.value.address);
    formData.append('phone', this.checkoutForm.value.phone);
    formData.append('email', this.checkoutForm.value.email);
    this.turno.newUser(formData).subscribe((data) => {
      this.handleData(data);
    });
  }
  handleData(data): void {
    console.log(data);
    if (data.status === 'ok') {
      // Cargar turno
    }
  }
}
