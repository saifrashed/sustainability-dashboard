import {Component, OnInit} from '@angular/core';
import {SurveyService} from "../../../../_services";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

    public scoringValue: any[number] = {};
    public scoringDescription: any[] = [];
    public survey: any = null;


    constructor(private surveyService: SurveyService, private route: ActivatedRoute, private router: Router,) {
        surveyService.findById(<string>this.route.snapshot.paramMap.get('id')).subscribe(survey => {
            this.survey = survey;
            this.scoringDescription = this.survey.scoringDescription;
        });
    }

    ngOnInit(): void {
    }

}
