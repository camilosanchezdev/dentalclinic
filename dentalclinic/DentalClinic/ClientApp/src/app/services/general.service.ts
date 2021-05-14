import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  // baseUrl: string = 'https://localhost:44347/api/';
  //baseUrl: string = 'https://localhost:5001/api/';
  baseUrl: string = 'https://dentalclinic1.herokuapp.com/api/';
  constructor() {}
}
