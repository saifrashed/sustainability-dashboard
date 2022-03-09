import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SurveyComponent} from './survey.component';
import {AppRoutingModule} from "../../../../app-routing.module";
import {customNotifierOptions} from "../../../../app.module";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NotifierModule} from 'angular-notifier';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, convertToParamMap} from "@angular/router";
import {RouterModule} from "@angular/router";

/**
 * Survey Component tests
 * @author Callum Svadkovski
 */
describe('SurveyComponent', () => {
  let component: SurveyComponent;

  let fixture: ComponentFixture<SurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ // components & services
        SurveyComponent
      ],
      imports: [ // imports
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule,
        RouterTestingModule,
        NotifierModule.withConfig(customNotifierOptions),
      ],
      providers: [
        HttpClient,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '619ece2d0d35ff19fc9fdd7a'
              })
            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('01: Should create', () => {
    expect(component).toBeTruthy();
    expect().nothing();
  });

  it('02: Should check the survey title and pillar', async () => {
    //Arrange
    let survey: any;

    //Act
    survey = await component.surveyService.findById(component.route.snapshot.paramMap.get("id")).toPromise()

    //Assert
    expect(survey.title).toBe("Education");
    expect(survey.pillar).toBe("Education");
  });

  it('03: Should check the survey question length', async () => {
    //Arrange
    let questions: any;

    //Act
    questions = await component.surveyService.findAllQuestions(component.route.snapshot.paramMap.get("id")).toPromise()

    //Assert
    expect(questions.length).toBe(14);
  });

  it('04: Should check the values of the scoring description', async () => {
    //Arrange
    let description: any;

    //Act
    description = await component.surveyService.findById(component.route.snapshot.paramMap.get("id")).toPromise()

    //Assert
    expect(description.scoringDescription[0]).toBe('Does not apply')
    expect(description.scoringDescription[1]).toBe('Incidental')
    expect(description.scoringDescription[2]).toBe('Cohesive')
    expect(description.scoringDescription[3]).toBe('Systematic')
    expect(description.scoringDescription[4]).toBe('Partner-oriented')
    expect(description.scoringDescription[5]).toBe('Impactful')
  });

  it('05: Should check if the id is correct', async () => {
    //Arrange
    let surveyId: any;

    //Act
    surveyId = await component.surveyService.findById(component.route.snapshot.paramMap.get("id")).toPromise()

    //Assert
    expect(surveyId.id).toBe('619ece2d0d35ff19fc9fdd7a')
  });

  it('06: Should check if questions and their weight are correct', async () => {
    //Arrange
    let question: any;

    //Act
    question = await component.surveyService.findAllQuestions(component.route.snapshot.paramMap.get("id")).toPromise()

    //Assert
    expect(question[1].description).toBe('To what extent does the program translate its vision and strategy on sustainability into concrete goals?')
    expect(question[1].weight).toBe(1)
  });
});
