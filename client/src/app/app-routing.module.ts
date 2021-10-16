import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// layouts
import {MainComponent} from './components/views/main/main-layout/main.component';
import {AuthenticationComponent} from './components/views/authentication/authentication-layout/authentication.component';
// components
import {HomeComponent} from './components/views/main/home/home.component';
import {LoginComponent} from './components/views/authentication/login/login.component';
import {RegisterComponent} from './components/views/authentication/register/register.component';
import {AdminComponent} from "./components/views/application/admin/admin.component";
import {ContactComponent} from './components/views/main/contact/contact.component';
import {ApplicationComponent} from "./components/views/application/application-layout/application.component";
import {FacultyComponent} from './components/views/application/faculty/faculty.component';
import {AuthGuard} from "./_helpers/auth.guard";
import {SurveyComponent} from "./components/views/application/survey/survey.component";


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'contact', component: ContactComponent},
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
            {path: '', redirectTo: "faculty", pathMatch: 'full'},
            {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
            {path: 'faculty', component: FacultyComponent, canActivate: [AuthGuard]},
            {path: 'faculty/survey/:id', component: SurveyComponent, canActivate: [AuthGuard]},
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
