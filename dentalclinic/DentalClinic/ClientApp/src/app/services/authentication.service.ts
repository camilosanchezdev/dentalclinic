import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { __await } from 'tslib';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  testUser: User = {
    username: 'username',
    password: '123456',
    token: 'sampleToken',
  };
  baseUrl: string = '';
  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) {
    this.baseUrl = generalService.baseUrl;
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
  isLoggedIn() {
    const token = this.getToken();
    return token != null;
  }
  loginDb(username: string, password: string) {
    let formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post(this.baseUrl + 'users/login', formData);
  }
  login(username: string, password: string): Observable<any> {
    return new Observable((observer) => {
      this.loginDb(username, password).subscribe(
        (response: any) => {
          if (response.token) {
            observer.next({
              username: username,
              token: response.token,
            });
            observer.complete();
          } else {
            observer.error({ error: 'Invalid credentials.' });
            observer.complete();
          }
        },
        (error) => {
          observer.error({ error: 'Invalid credentials.' });
          observer.complete();
        }
      );
    });
  }
  validateToken(): Observable<any> {
    let token = localStorage.getItem('token');
    let formData: FormData = new FormData();
    formData.append('token', token);

    return new Observable((observer) => {
      this.http.post(this.baseUrl + 'users/validate', formData).subscribe(
        (resp) => {
          observer.next({
            isValid: resp,
          });
          observer.complete();
        },
        (error) => {
          observer.error({ error: error });
          observer.complete();
        }
      );
    });
    // .subscribe((response) => {
    //   return response;
    // });
  }
  validateToken2(token): Observable<any> {
    return new Observable((observer) => {
      if (token != null) {
        const resp = this.http
          .post(this.baseUrl + 'users/validate', token)
          .subscribe((response) => response);
        if (resp) {
          observer.next({
            isValid: resp,
          });
          observer.complete();
        } else {
          observer.error({ error: 'Invalid credentials.' });
          observer.complete();
        }
      } else {
        observer.error({ error: 'Invalid credentials.' });
        observer.complete();
      }
    });
  }
}
