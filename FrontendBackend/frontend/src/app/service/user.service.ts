import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url = 'http://localhost:8080/user';

  constructor( private _http: HttpClient) {
  }

  getAll() {
    return this._http.get<User[]>(this.base_url);
  }

  createUser(user: User) {
    return this._http.post<User>(this.base_url, user);
  }
}
