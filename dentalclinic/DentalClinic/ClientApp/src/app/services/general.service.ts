import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  baseUrl: string = 'https://localhost:44347/api/';
  constructor() {}
}
