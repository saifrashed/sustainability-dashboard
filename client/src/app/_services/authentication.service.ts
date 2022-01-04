import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../_models';

import {environment} from '../../environments/environment'

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public currentUser: Observable<User>;
    private currentUserSubject: BehaviorSubject<User>;

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
        return this.http.post<User>(`${environment.apiUrl}/api/auth/signin`, {username, password})
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
        return this.http.get(`${environment.apiUrl}/api/auth/users`)
    }

    findById(id: any) {
        return this.http.get<User>(`${environment.apiUrl}/api/auth/users/` + id);
    }

    deleteById(id: any) {
        return this.http.delete(`${environment.apiUrl}/api/auth/users/` + id);
    }

    create(user: User) {
        return this.http.post(`${environment.apiUrl}/api/auth/signup`, user);
    }

    update(user: User) {
        console.log(user);
        return this.http.put(`${environment.apiUrl}/api/auth/users`, user);
    }

}


