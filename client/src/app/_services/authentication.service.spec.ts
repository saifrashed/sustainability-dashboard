import {inject, TestBed} from '@angular/core/testing';
import {AuthenticationService} from "./authentication.service";
import {HttpClientModule} from '@angular/common/http';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationService,
            ],
            imports: [
                HttpClientModule
            ]
        });

        service = TestBed.get(AuthenticationService);
    });


});
