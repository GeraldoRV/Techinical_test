import {Injectable} from '@angular/core';
import {UserMemory} from '../memory/user-memory';
import {User} from '../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  base_url = 'http://localhost:8080/user';

  constructor(private _userMemory: UserMemory, private _http: HttpClient) {
  }

  getAll() {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa('User 1:admin')});
    return this._http.get<User[]>(this.base_url, {headers: headers});
  }

  createUser(user: User) {
    return this._http.post<User>(this.base_url, user);
  }
}
