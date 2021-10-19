import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module'; // CLI imports AppRoutingModule
import { HttpClientModule } from '@angular/common/http';
// layouts
import { MainComponent } from './components/views/main/main-layout/main.component';
import { AuthenticationComponent } from './components/views/authentication/authentication-layout/authentication.component';
import { ApplicationComponent } from './components/views/application/application-layout/application.component';

// components
import {AppComponent} from './app.component';
import {HomeComponent} from './components/views/main/home/home.component';
import { LoginComponent } from './components/views/authentication/login/login.component';
import { RegisterComponent } from './components/views/authentication/register/register.component';
import { AdminComponent } from './components/views/application/admin/admin.component';
import { ContactComponent } from './components/views/main/contact/contact.component';
import { FacultyComponent } from './components/views/application/faculty/faculty.component';
import {SurveyComponent} from "./components/views/application/survey/survey.component";
import { SurveyQuestionComponent } from './components/views/application/survey-question/survey-question.component';

@NgModule({
    declarations: [
        MainComponent,
        AuthenticationComponent,
        ApplicationComponent,
        AppComponent,
        HomeComponent,
        MainComponent,
        AuthenticationComponent,
        ApplicationComponent,
        LoginComponent,
        RegisterComponent,
        AdminComponent,
        ContactComponent,
        FacultyComponent,
        SurveyComponent,
        SurveyQuestionComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
