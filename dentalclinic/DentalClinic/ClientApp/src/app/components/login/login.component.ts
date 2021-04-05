import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './../../models/user';
import { AppState, selectAuthenticationState } from './../../store/app.states';
import { Login } from './../../store/actions/authentication.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  checkoutForm: FormGroup;
  getState$: Observable<any>;
  errorMessage: string = null;
  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.getState$ = this.store.select(selectAuthenticationState);
    this.checkoutForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getState$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }
  onSubmit(): void {
    const actionPayload = {
      username: this.checkoutForm.value.username,
      password: this.checkoutForm.value.password,
    };

    this.store.dispatch(new Login(actionPayload));
  }
}
