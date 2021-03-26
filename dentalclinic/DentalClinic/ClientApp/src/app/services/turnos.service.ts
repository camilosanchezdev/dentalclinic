import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  private _turno: BehaviorSubject<boolean>;
  _baseUrl: string = '';
  id_turno: Number = 0;
  turnoSelected: string = '';
  constructor(private general: GeneralService, private http: HttpClient) {
    this._baseUrl = general.baseUrl;
    this._turno = new BehaviorSubject<boolean>(false);
  }
  getTurnos(id_especialista) {
    return this.http.get(this._baseUrl + 'turnos/turnos/' + id_especialista);
  }
  getTurno(id_turno) {
    return this.http.get(this._baseUrl + 'turnos/turno/' + id_turno);
  }
  newTurno(id_turno, id_client) {
    return this.http.post(
      this._baseUrl + 'turnos/turno/new/' + id_turno + '/' + id_client,
      null
    );
  }
  setValue(value): void {
    this._turno.next(value);
  }
  getValue(): Observable<boolean> {
    return this._turno.asObservable();
  }
}
