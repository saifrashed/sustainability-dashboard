import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module'; // CLI imports AppRoutingModule
import {HttpClientModule} from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

// layouts
import {MainComponent} from './components/views/main/main-layout/main.component';
import {AuthenticationComponent} from './components/views/authentication/authentication-layout/authentication.component';
import {ApplicationComponent} from './components/views/application/application-layout/application.component';
// components
import {AppComponent} from './app.component';
import {HomeComponent} from './components/views/main/home/home.component';
import {LoginComponent} from './components/views/authentication/login/login.component';
import {RegisterComponent} from './components/views/authentication/register/register.component';
import {AdminComponent} from './components/views/application/admin-screens/admin/admin.component';
import {AdminSurveyComponent} from './components/views/application/admin-screens/admin-survey/admin-survey.component';
import {AdminProfileComponent} from './components/views/application/admin-screens/admin-profile/admin-profile.component';
import {AdminStatisticComponent} from './components/views/application/admin-screens/admin-statistic/admin-statistic.component';
import {ContactComponent} from './components/views/main/contact/contact.component';
import {FacultyComponent} from './components/views/application/faculty/faculty.component';
import {SurveyComponent} from "./components/views/application/survey/survey.component";
import {SurveyQuestionComponent} from './components/views/application/survey-question/survey-question.component';



/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'right',
            distance: 12
        },
        vertical: {
            position: 'bottom',
            distance: 12,
            gap: 10
        }
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: 'hide',
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease'
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50
        },
        shift: {
            speed: 300,
            easing: 'ease'
        },
        overlap: 150
    }
};

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
        AdminSurveyComponent,
        AdminProfileComponent,
        AdminStatisticComponent,
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
        NotifierModule.withConfig(customNotifierOptions)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
