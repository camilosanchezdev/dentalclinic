import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  _baseUrl: string = '';
  especialista: number = 0;
  dniSelected: number = 0;
  constructor(private general: GeneralService, private http: HttpClient) {
    this._baseUrl = general.baseUrl;
  }
  getAllEspecialistas() {
    return this.http.get(this._baseUrl + 'especialistas/especialistas');
  }
  getEspecialista(id_especialista) {
    return this.http.get(
      this._baseUrl + 'especialistas/especialistas/' + id_especialista
    );
  }
  getTurnos(id_especialista) {
    return this.http.get(this._baseUrl + 'turnos/turnos/' + id_especialista);
  }
  getClient(dni) {
    return this.http.get(this._baseUrl + 'clients/clients/' + dni);
  }
  newUser(data) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post(this._baseUrl + 'clients/clients/new', data);
  }
}
