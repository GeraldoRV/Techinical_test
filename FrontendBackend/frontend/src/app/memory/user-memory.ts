import {User} from '../model/user';
import {Injectable} from '@angular/core';

@Injectable()
export class UserMemory {
  private users: User[] = [
    {
      id: 1,
      name: 'Felipe',
      password: 'Felipe',
      roles: ['standard', 'admin']
    }, {
      id: 2,
      name: 'Roberto',
      password: 'Roberto',
      roles: ['standard']
    }, {
      id: 3,
      name: 'Maria',
      password: 'Maria',
      roles: ['standard']
    }, {
      id: 4,
      name: 'Rebeca',
      password: 'Rebeca',
      roles: ['standard']
    }
  ];

  getUsers() {
    return this.users;
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  addUser(user: User) {
    const last = this.users[this.users.length - 1];
    user.id = last.id + 1;
    user.password = user.name;
    this.users.push(user);
  }

  login(name: any, password: any) {
    return this.users.find(
      user => user.name === name && user.password === password);

  }
}
