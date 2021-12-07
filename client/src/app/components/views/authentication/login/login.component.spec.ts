import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AppRoutingModule, routes} from "../../../../app-routing.module";
import {customNotifierOptions} from "../../../../app.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NotifierModule} from 'angular-notifier';
import { RouterTestingModule } from '@angular/router/testing';
import {AuthenticationService} from "../../../../_services";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let componentHtml: HTMLElement;

    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ // components & services
                LoginComponent,
            ],
            imports: [ // imports
                BrowserModule,
                FormsModule,
                AppRoutingModule,
                HttpClientModule,
                ReactiveFormsModule,
                RouterTestingModule,
                NotifierModule.withConfig(customNotifierOptions),
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        componentHtml = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('01: should create', () => {
        expect(component).toBeTruthy();
        expect().nothing();
    });

    it('02: should update  user data correctly within component', () => {
        // Arrange
        const usernameInput: HTMLInputElement = componentHtml.querySelector('#username');
        const passwordInput: HTMLInputElement = componentHtml.querySelector('#password');

        // Act: edit input data
        usernameInput.value = 'facultyOne';
        passwordInput.value = 'facultyOne';

        usernameInput.dispatchEvent(new Event('input'));
        passwordInput.dispatchEvent(new Event('input'));
        fixture.detectChanges(); // Angular should be updated


        // Assert: Check if component form object is equel to input
        expect(component.loginForm.getRawValue().username).toBe("facultyOne");
        expect(component.loginForm.getRawValue().password).toBe("facultyOne");
    });

    it('03: should receive correct user data after submit', () => {

        // Arrange
        const usernameInput: HTMLInputElement = componentHtml.querySelector('#username');
        const passwordInput: HTMLInputElement = componentHtml.querySelector('#password');
        const submitButton: HTMLButtonElement = componentHtml.querySelector('#submitButton');

        const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
        const spy = spyOn(authenticationService, 'login').and.callThrough();


        // Act: Login with correct user data
        usernameInput.value = 'facultyOne';
        passwordInput.value = 'facultyOne';

        usernameInput.dispatchEvent(new Event('input'));
        passwordInput.dispatchEvent(new Event('input'));
        fixture.detectChanges(); // Angular should be updated

        submitButton.click();
        fixture.detectChanges(); // Angular should be updated


        // Assert: Check if data is correct
        spy.calls.mostRecent().returnValue.subscribe(result => {
            expect(result.username).toBe('facultyOne');
            expect(result.email).toBe("facultyOne@gmail.com");
            expect(component).toBeTruthy();
            console.log(result)
        });

        expect().nothing();
    });

    it('04: should receive correct message after failed login', () => {

        // Arrange
        const usernameInput: HTMLInputElement = componentHtml.querySelector('#username');
        const passwordInput: HTMLInputElement = componentHtml.querySelector('#password');
        const submitButton: HTMLButtonElement = componentHtml.querySelector('#submitButton');

        const authenticationService = fixture.debugElement.injector.get(AuthenticationService);
        const spy = spyOn(authenticationService, 'login').and.callThrough();


        // Act: Login with incorrect data
        usernameInput.value = 'facultyOne';
        passwordInput.value = 'facultyTwo';

        usernameInput.dispatchEvent(new Event('input'));
        passwordInput.dispatchEvent(new Event('input'));
        fixture.detectChanges(); // Angular should be updated

        submitButton.click();
        fixture.detectChanges(); // Angular should be updated


        // Assert: Error contains correct message
        spy.calls.mostRecent().returnValue.subscribe(result => {
            console.log(result)
        }, (error) => {
            console.log(error.error.message);
            expect(error.error.message).toBe("Error: Unauthorized");

        });

        expect().nothing();
    });
});
