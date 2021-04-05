import { Action } from '@ngrx/store';

export enum AuthenticationActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  ROOT_EFFECTS_INIT = '[Auth] init effect',
  IS_AUTH = '[Auth] is Auth',
}
export class Init implements Action {
  readonly type = AuthenticationActionTypes.ROOT_EFFECTS_INIT;
  constructor(public payload: any) {}
}
export class IsAuth implements Action {
  readonly type = AuthenticationActionTypes.IS_AUTH;
  constructor(public payload: any) {}
}
export class Login implements Action {
  readonly type = AuthenticationActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthenticationActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = AuthenticationActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthenticationActionTypes.LOGOUT;
}

export type AuthenticationActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | Init
  | IsAuth;
