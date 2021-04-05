import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EspecialistasService {
  private _especialista: BehaviorSubject<boolean>;
  _baseUrl: string = '';
  especialista: number = 0;
  especialista_name: string = '';
  constructor(private general: GeneralService, private http: HttpClient) {
    this._baseUrl = general.baseUrl;
    this._especialista = new BehaviorSubject<boolean>(false);
  }
  getAllEspecialistas() {
    return this.http.get(this._baseUrl + 'especialistas/especialistas');
  }
  getEspecialista(id_especialista) {
    return this.http.get(
      this._baseUrl + 'especialistas/especialistas/' + id_especialista
    );
  }
  setValue(value): void {
    this._especialista.next(value);
  }
  getValue(): Observable<boolean> {
    return this._especialista.asObservable();
  }
  getDias(id_especialista) {
    return this.http.get(this._baseUrl + 'turnos/getdias/' + id_especialista);
  }
}
