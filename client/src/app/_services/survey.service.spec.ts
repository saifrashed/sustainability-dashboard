import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {SurveyService} from "./survey.service";


/**
 * Survey Service tests
 * @author Callum Svadkovski
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

    // // Assert: Check if component form object is equal to input
    expect(surveyRequest.title).toBe("Education");
  });

});
