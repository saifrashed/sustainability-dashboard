import {Component, OnInit} from '@angular/core';

import {AdminComponent} from "../admin/admin.component";
import {Survey} from "../../../../../_models/survey";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-admin-survey',
    templateUrl: './admin-survey.component.html',
    styleUrls: ['../admin/admin.component.css']
})

export class AdminSurveyComponent extends AdminComponent implements OnInit {


    public newSurveyForm = new FormGroup({
        title: new FormControl(''),
        pillar: new FormControl(''),
        optionZero: new FormControl('Bad'),
        optionOne: new FormControl('Below average'),
        optionTwo: new FormControl('Average'),
        optionThree: new FormControl('Above average'),
        optionFour: new FormControl('Good'),
        optionFive: new FormControl('Excellent'),
    });


    public newQuestionForm = new FormGroup({
        description: new FormControl(''),
        cluster: new FormControl(''),
        weight: new FormControl(1),
    });

    ngOnInit(): void {
        super.ngOnInit();

        this.surveyService.findAll().subscribe(surveyList => {
            this.surveyList = surveyList;
            this.getCompletedSurveys();
        });
    }

    reopenSurvey(id: any) {
        this.surveyService.reopenSurvey(id).subscribe(message => {
            console.log(message);
            this.getSurveys();
            this.notifierService.notify("success", "Survey successfully reopened. ", "SUCCESS_SURVEY_REOPEN")
        });
    }

    // Survey CRUD
    getSurveys() {
        this.surveyService.findAll().subscribe(surveyList => {
            this.surveyList = surveyList;
            this.getCompletedSurveys();
        });
    }

    getCompletedSurveys() {
        for (let index in this.surveyList) {
            this.surveyResponse.getCompletedSurveys(this.surveyList[index].id).subscribe(result => {
                this.surveyList[index].completed = result;
            });
        }
    }

    getSurveyQuestions(id: string) {
        this.surveyService.findAllQuestions(id).subscribe(surveyQuestions => {
            this.selectedSurveyQuestions = surveyQuestions;
            this.selectedSurveyId = id;
        })
    }

    addSurvey() {

        let surveyObject: Survey = {
            id: null,
            title: this.newSurveyForm.controls["title"].value,
            pillar: this.newSurveyForm.controls["pillar"].value,
            scoringDescription: [
                this.newSurveyForm.controls["optionZero"].value,
                this.newSurveyForm.controls["optionOne"].value,
                this.newSurveyForm.controls["optionTwo"].value,
                this.newSurveyForm.controls["optionThree"].value,
                this.newSurveyForm.controls["optionFour"].value,
                this.newSurveyForm.controls["optionFive"].value
            ]
        };


        this.surveyService.create(surveyObject).subscribe(message => {
            this.getSurveys();
            this.newSurveyForm.reset();
            this.newSurveyForm.controls["optionZero"].setValue("Bad");
            this.newSurveyForm.controls["optionOne"].setValue("Below average");
            this.newSurveyForm.controls["optionTwo"].setValue("Average");
            this.newSurveyForm.controls["optionThree"].setValue("Above average");
            this.newSurveyForm.controls["optionFour"].setValue("Good");
            this.newSurveyForm.controls["optionFive"].setValue("Excellent");
        });
    }

    deleteSurvey(id: any) {
        if (confirm("Are you sure?")) {
            this.surveyService.delete(id).subscribe(message => {
                this.getSurveys();
                this.notifierService.notify("success", "Survey successfully deleted. ", "SUCCESS_SURVEY_DELETE")
            });

        } else {
            this.notifierService.notify("error", "Survey is not deleted.", "FAIL_SURVEY_DELETE")
        }
    }

    // SurveyResponse model

    addSurveyQuestion() {

        if (!this.newQuestionForm.controls["description"].value || !this.newQuestionForm.controls["weight"].value) {
            this.notifierService.notify("error", "Fill in all fields", 'SURVEY_ADD_ERROR');
            return;
        }

        let questionObject = {
            id: null,
            surveyId: this.selectedSurveyId,
            description: this.newQuestionForm.controls["description"].value,
            cluster: this.newQuestionForm.controls["cluster"].value,
            weight: this.newQuestionForm.controls["weight"].value,
        };

        this.surveyService.createQuestion(questionObject).subscribe(message => {
            this.getSurveyQuestions(this.selectedSurveyId);
            this.newQuestionForm.reset();
            this.newQuestionForm.controls["weight"].setValue(1);
            this.notifierService.notify("success", "Question has been added to the survey", "ADD_SURVEY_QUESTION")
        })
    }

}
