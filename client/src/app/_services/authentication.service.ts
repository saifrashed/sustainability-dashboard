import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return this.currentUserValue != null;
  }

  login(username: string, password: string) {
    return this.http.post<any>( `http://localhost:8080/api/auth/signin`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null as any);
  }

  findAll() {
    return this.http.get('http://localhost:8080/api/auth/users')
  }

  deleteById(id: any) {
    return this.http.delete('http://localhost:8080/api/auth/users/'+id);
  }

  create(user: User) {
    return this.http.post('http://localhost:8080/api/auth/signup', user);
  }

}
