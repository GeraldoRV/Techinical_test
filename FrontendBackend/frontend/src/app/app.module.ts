import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbdSortableHeader, UserListComponent} from './component/user-list/user-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserMemory} from './memory/user-memory';
import {LoginComponent} from './component/login/login.component';
import {AuthGuard} from './service/authentication/auth.guard';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'users', component: UserListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NgbdSortableHeader,
    UserListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserMemory],
  bootstrap: [AppComponent]
})
export class AppModule {
}
