import { Component, OnInit } from '@angular/core';

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
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
