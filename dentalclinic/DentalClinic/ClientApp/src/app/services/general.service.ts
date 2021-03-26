import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  //baseUrl: string = 'https://localhost:44347/api/';
  baseUrl: string = 'https://dentalclinicweb.azurewebsites.net/api/';
  constructor() {}
}
