import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from './../../models/user';
import { AppState, selectAuthenticationState } from './../../store/app.states';
import { Logout } from './../../store/actions/authentication.actions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: User;
  getState: Observable<any>;
  isAuthenticated: boolean = false;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthenticationState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
    });
  }
  logout(): void {
    this.store.dispatch(new Logout());
  }
}
