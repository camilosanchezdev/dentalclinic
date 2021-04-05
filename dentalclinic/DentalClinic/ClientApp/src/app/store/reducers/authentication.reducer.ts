import { User } from '../../models/user';
import {
  AuthenticationActionTypes,
  AuthenticationActions,
} from '../actions/authentication.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false, //localStorage.getItem('token') !== null,
  user: {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
  },
  errorMessage: null,
};

export function reducer(
  state = initialState,
  action: AuthenticationActions
): State {
  switch (action.type) {
    case AuthenticationActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          username: action.payload.username,
        },
        errorMessage: null,
      };
    }
    case AuthenticationActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Wrong credentials.',
      };
    }
    case AuthenticationActionTypes.LOGOUT: {
      return initialState;
    }
    case AuthenticationActionTypes.ROOT_EFFECTS_INIT: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case AuthenticationActionTypes.IS_AUTH: {
      return {
        ...state,
        isAuthenticated: action.payload.isAuth,
      };
    }
    default: {
      return state;
    }
  }
}
