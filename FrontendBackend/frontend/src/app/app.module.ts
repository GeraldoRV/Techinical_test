import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbdSortableHeader, UserListComponent} from './component/user-list/user-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {path: '', component: UserListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NgbdSortableHeader,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
