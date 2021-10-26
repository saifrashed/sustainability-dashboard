import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../_services";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from 'rxjs/operators';
import {FormControl, FormGroup} from "@angular/forms";
import {NotifierService} from 'angular-notifier';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    private loading = false;
    private submitted = false;
    private error = '';


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private notifierService: NotifierService
    ) {
        if (this.authenticationService.isLoggedIn()) {
            this.router.navigate(["dashboard"])
        }
    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            this.notifierService.notify('error', "Check if fields are correct", 'LOGIN_ERROR');
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.loginForm.value["username"], this.loginForm.value["password"])
            .pipe(first())
            .subscribe(
                data => {
                    this.notifierService.notify('success', "Signing in...", 'LOGIN_SUCCESS');
                    this.router.navigate(["/dashboard"]);
                },
                error => {
                    this.notifierService.notify('error', error.message, 'LOGIN_ERROR');
                    this.error = error;
                    this.loading = false;
                });

    }


}
