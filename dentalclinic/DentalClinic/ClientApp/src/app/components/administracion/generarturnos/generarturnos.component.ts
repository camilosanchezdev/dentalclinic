import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EspecialistasService } from './../../../services/especialistas.service';

@Component({
  selector: 'app-generarturnos',
  templateUrl: './generarturnos.component.html',
  styleUrls: ['./generarturnos.component.css'],
})
export class GenerarturnosComponent implements OnInit {
  checkoutForm: FormGroup;
  especialistas: Array<Object> = [];
  dias_disponibles: Array<string> = [];
  constructor(
    private formBuilder: FormBuilder,
    private especialistasService: EspecialistasService
  ) {
    this.checkoutForm = this.formBuilder.group({
      especialista: [null, Validators.required],
      0: [null, Validators.required],
      1: [null, Validators.required],
      2: [null, Validators.required],
      3: [null, Validators.required],
      4: [null, Validators.required],
      5: [null, Validators.required],
      6: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.especialistasService.getAllEspecialistas().subscribe(
      (data: Array<Object>) => {
        data.forEach((element: any) => {
          let newEspecialista = {
            name: element.name,
            id_especialista: element.id_especialista,
          };
          this.especialistas.push(newEspecialista);
        });
      },
      (error) => console.log(error)
    );
  }
  onSubmit(): void {
    console.log(this.checkoutForm.value);
  }
  onchangeEspecialista($event): void {
    if ($event.target.value != 0) {
      this.especialistasService.getDias($event.target.value).subscribe(
        (data: any) => {
          this.dias_disponibles = [];
          for (let index = 0; index < data.diasDisponibles.length; index++) {
            //let dia = data.diasDisponibles;
            const dia =
              this.capitalizeFirstLetter(data.diasSemana[index]) +
              ' ' +
              this.convertDigitIn(data.diasDisponibles[index].slice(0, 10));
            this.dias_disponibles.push(dia);
          }
        },
        (error) => console.log(error)
      );
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  convertDigitIn(str) {
    return str.split('-').reverse().join('/');
  }
}
