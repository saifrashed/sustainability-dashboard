import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// layouts
import {MainComponent} from './components/layouts/main/main.component';
import {AuthenticationComponent} from './components/layouts/authentication/authentication.component';
// components
import {HomeComponent} from './components/views/main/home/home.component';
import {LoginComponent} from './components/views/authentication/login/login.component';
import {RegisterComponent} from './components/views/authentication/register/register.component';
import {DashboardComponent} from "./components/views/application/dashboard/dashboard.component";
import {ContactComponent} from './components/views/main/contact/contact.component';
import {AboutComponent} from "./components/views/main/about/about.component";
import {PageNotFoundComponent} from "./components/views/page-not-found/page-not-found.component";


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contact', component: ContactComponent}
    ]
  },
  {
    path: 'account',
    component: AuthenticationComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}

    ]
  },
  {
    path: 'dashboard',
    component: AuthenticationComponent,
    children: [
      {path: '', component: DashboardComponent},

    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
