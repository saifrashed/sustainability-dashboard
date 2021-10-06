import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// layouts
import {MainComponent} from './components/views/main/main-layout/main.component';
import {AuthenticationComponent} from './components/views/authentication/authentication-layout/authentication.component';
// components
import {HomeComponent} from './components/views/main/home/home.component';
import {LoginComponent} from './components/views/authentication/login/login.component';
import {RegisterComponent} from './components/views/authentication/register/register.component';
import {DashboardComponent} from "./components/views/application/dashboard/dashboard.component";
import { ContactComponent } from './components/views/main/contact/contact.component';
import {ApplicationComponent} from "./components/views/application/application-layout/application.component";


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {path: '', component: HomeComponent}
        ]
    },
    {
        path: 'contact',
        component: MainComponent,
        children: [
            {path: '', component: ContactComponent}
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
        component: ApplicationComponent,
        children: [
            {path: '', component: DashboardComponent},

        ]
    }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
