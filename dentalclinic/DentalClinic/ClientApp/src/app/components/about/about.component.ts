import { Component, OnInit } from '@angular/core';
import { EspecialistasService } from '../../services/especialistas.service';
import { TurnosService } from '../../services/turnos.service';
import { ClientsService } from '../../services/clients.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  imagenes: any = [
    'https://enjoydental.com.ar/wp-content/uploads/2018/03/martin-domina-con-evelyn.jpg',
    'https://enjoydental.com.ar/wp-content/uploads/2018/03/foto-rosa.jpg',
    'https://enjoydental.com.ar/wp-content/uploads/2018/03/foto-groupon.jpg',
    'https://enjoydental.com.ar/wp-content/uploads/2018/03/sala-enjoy-dental.jpg',
  ];
  responsiveOptions = [
    // {
    //   breakpoint: '900px',
    //   numVisible: 1,
    //   numScroll: 1,
    // },
    // {
    //   breakpoint: '768px',
    //   numVisible: 1,
    //   numScroll: 1,
    // },
    // {
    //   breakpoint: '560px',
    //   numVisible: 1,
    //   numScroll: 1,
    // },
  ];
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
