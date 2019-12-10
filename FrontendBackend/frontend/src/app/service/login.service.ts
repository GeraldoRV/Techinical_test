import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: User;
  private base_url = 'http://localhost:8080/login';

  constructor(private _http: HttpClient) {
  }

  login(name, password) {
    let params = new HttpParams();
    params = params.append('name', name);
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(name + ':' + password)});
    return this._http.get<User>(this.base_url, {headers: headers, params: params});
  }

  setUserLogin(user: User) {
    this.user = user;

  }

  hasRole(role: string) {
    const roleFound = this.user.roles.find(roleName => roleName === role);
    return roleFound !== undefined;
  }

  isLoginIn() {
    return this.user !== undefined;
  }

  logout() {
    this.user = undefined;
  }
}
