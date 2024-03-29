import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models';
import {environment} from '../../environments/environment'

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {
    }

    getCurrentFaculty() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/auth/users/faculty/id`)
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/auth/users`);
    }

}
