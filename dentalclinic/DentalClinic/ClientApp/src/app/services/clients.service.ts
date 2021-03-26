import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private _name: BehaviorSubject<boolean>;
  _baseUrl: string = '';
  dniSelected: number = 0;
  clientExist: boolean = false;
  id_client: number = 0;
  name_client: string = '';
  modelClient = {
    dni: 0,
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
  };
  constructor(private general: GeneralService, private http: HttpClient) {
    this._baseUrl = general.baseUrl;
    this._name = new BehaviorSubject<boolean>(false);
  }

  getClient(dni) {
    return this.http.get(this._baseUrl + 'clients/clients/' + dni);
  }
  newClient(data) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post(this._baseUrl + 'clients/clients/new', data);
  }
  updateClient(data) {
    const options = { headers: { 'Content-Type': 'application/json' } };
    return this.http.post(this._baseUrl + 'clients/clients/update', data);
  }
  setValue(value): void {
    this._name.next(value);
  }
  getValue(): Observable<boolean> {
    return this._name.asObservable();
  }
}
