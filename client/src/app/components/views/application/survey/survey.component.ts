import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../../../_services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

    public scoringResponse: any[] = [];
    public scoringDescription: any[] = [];
    public survey: any = null;

    public questions: any;


    constructor(private surveyService: SurveyService, private route: ActivatedRoute, private router: Router,) {
        surveyService.findById(<string>this.route.snapshot.paramMap.get('id')).subscribe(survey => {
            this.survey = survey;
            this.scoringDescription = this.survey.scoringDescription;
        });

        surveyService.findAllQuestions(<string>this.route.snapshot.paramMap.get('id')).subscribe(questions => {
            this.questions = questions;
            console.log(questions)
        })
    }

    ngOnInit(): void {
    }


    addOrUpdateScoringArray(newItem: any) {

        let index = this.scoringResponse.findIndex(x => x.question.id === newItem.question.id);

        if(index != -1) {
            this.scoringResponse[index] = newItem
        } else {
            this.scoringResponse.push(newItem);
        }


        console.log(this.scoringResponse)

    }

    onSubmit() {
        console.log(this.scoringResponse)
    }

}
