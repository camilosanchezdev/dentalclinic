import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  Actions,
  createEffect,
  Effect,
  EFFECTS_ERROR_HANDLER,
  ofType,
  OnInitEffects,
} from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import {
  AuthenticationActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  Init,
  IsAuth,
} from '../actions/authentication.actions';

@Injectable()
export class AuthenticationEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  ngrxOnInitEffects(): Action {
    return { type: '[Auth] init effect' };
  }
  Init = createEffect(
    (): Observable<any> =>
      this.actions.pipe(
        ofType(AuthenticationActionTypes.ROOT_EFFECTS_INIT),
        switchMap(() =>
          this.authenticationService.validateToken().pipe(
            map((resp) => {
              return new IsAuth({ isAuth: resp.isValid });
            })
          )
        )
      )
    //{ dispatch: false }
  );
  IsAuth = createEffect(
    () => this.actions.pipe(ofType(AuthenticationActionTypes.IS_AUTH)),
    { dispatch: false }
  );
  Login = createEffect(() =>
    this.actions.pipe(
      ofType(AuthenticationActionTypes.LOGIN),
      map((action: Login) => action.payload),
      switchMap((payload) => {
        return this.authenticationService
          .login(payload.username, payload.password)
          .pipe(
            map((user: any) => {
              return new LoginSuccess({
                token: user.token,
                username: payload.username,
              });
            }),
            catchError((error) => {
              return of(new LoginFailure({ error: error }));
            })
          );
      })
    )
  );
  LoginSuccess = createEffect(
    () =>
      this.actions.pipe(
        ofType(AuthenticationActionTypes.LOGIN_SUCCESS),
        tap((user: any) => {
          // when the user logs in successfully, the token and the username are saved to localStorage
          localStorage.setItem('token', user.payload.token);
          localStorage.setItem('username', user.payload.username);
          this.router.navigateByUrl('/admin');
        })
      ),
    { dispatch: false }
  );
  LoginFailure = createEffect(
    () => this.actions.pipe(ofType(AuthenticationActionTypes.LOGIN_FAILURE)),
    { dispatch: false }
  );
  public Logout = createEffect(
    (): Observable<any> =>
      this.actions.pipe(
        ofType(AuthenticationActionTypes.LOGOUT),
        tap((user) => {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );
}
