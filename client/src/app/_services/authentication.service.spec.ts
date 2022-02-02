import {TestBed} from '@angular/core/testing';
import {AuthenticationService} from "./authentication.service";
import {HttpClientModule} from '@angular/common/http';
import {User} from "../_models";


/**
 * Auth Service tests
 *
 * @author Saif Rashed
 */
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

        service = TestBed.get(AuthenticationService)
    });

    it('01: Should create', () => {
        expect(service).toBeTruthy();
    });

    it('02: Should Register', async () => {

        // Arrange
        const newUser: User = new User(undefined, "testRegister", "testRegister@gmail.com", "FACULTY OF BUSINESS AND ECONOMICS", "AMSIB - INTERNATIONAL BUSINESS", "testRegister", ["ROLE_FACULTY"]);


        // Act: edit input data
        let newUserRequest: any = await service.create(newUser).toPromise();
        let result = await service.login("testRegister", "testRegister").toPromise();
        let deleteResult: any = await service.deleteById(result.id).toPromise();






        // Assert: Check if component form object is equel to input
        expect(deleteResult.message).toBe("User deleted successfully!");




    });


    it('03: Should login', async () => {

        // Arrange
        const username = "facultyOne";
        const password = "facultyOne";


        // Act: edit input data
        let result = await service.login(username, password).toPromise();


        // Assert: Check if component form object is equel to input
        expect(result.email).toBe("facultyOne@gmail.com");
        expect(result.faculty).toBe("FACULTY OF APPLIED SOCIAL SCIENCES AND LAW");
    });


});
