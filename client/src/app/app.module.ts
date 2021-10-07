import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module'; // CLI imports AppRoutingModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';

// layouts
import { MainComponent } from './components/views/main/main-layout/main.component';
import { AuthenticationComponent } from './components/views/authentication/authentication-layout/authentication.component';
import { ApplicationComponent } from './components/views/application/application-layout/application.component';

// components
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/views/main/main-elements/header/header.component';
import {HomeComponent} from './components/views/main/home/home.component';
import {FooterComponent} from './components/views/main/main-elements/footer/footer.component';
import { LoginComponent } from './components/views/authentication/login/login.component';
import { RegisterComponent } from './components/views/authentication/register/register.component';
import { AdminComponent } from './components/views/application/admin/admin.component';
import { ContactComponent } from './components/views/main/contact/contact.component';
import { FacultyComponent } from './components/views/application/faculty/faculty.component';

@NgModule({
    declarations: [
        MainComponent,
        AuthenticationComponent,
        ApplicationComponent,
        AppComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        MainComponent,
        AuthenticationComponent,
        ApplicationComponent,
        LoginComponent,
        RegisterComponent,
        AdminComponent,
        ContactComponent,
        FacultyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
