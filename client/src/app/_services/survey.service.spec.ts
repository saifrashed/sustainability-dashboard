import {TestBed} from '@angular/core/testing';
import {AuthenticationService} from "./authentication.service";
import {HttpClientModule} from '@angular/common/http';
import {User} from "../_models";
import {SurveyService} from "./survey.service";


/**
 * Auth Service tests
 *
 * @author Saif Rashed
 */
describe('SurveyService', () => {
    let service: SurveyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SurveyService,
            ],
            imports: [
                HttpClientModule
            ]
        });

        service = TestBed.get(SurveyService)
    });

    it('01: Should create', () => {
        expect(service).toBeTruthy();
    });

    it('02: Should get single survey', async () => {

        // Arrange
        const surveyId = "619ece2d0d35ff19fc9fdd7a";


        // Act: edit input data
        let surveyRequest: any = await service.findById(surveyId).toPromise();


        console.log(surveyRequest);


        // // Assert: Check if component form object is equel to input
        expect(surveyRequest.title).toBe("Education");




    });



});
