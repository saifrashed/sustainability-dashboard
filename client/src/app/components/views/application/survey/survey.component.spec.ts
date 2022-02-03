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
 * Survey tests
 *
 * @author Callum Svadkovski
 */
describe('SurveyComponent', () => {
    let component: SurveyComponent;
    let componentHtml: HTMLElement;

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
        componentHtml = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('01: should create', () => {
        expect(component).toBeTruthy();
        expect().nothing();
    });

    it('02: Should load in the survey', () => {
        //Arrange
        console.log(component)
        //Act
        //Assert
    });

    it('03: Should load in survey questions', () => {

    });

    it('04: Should submit a survey', () => {

    });

});
