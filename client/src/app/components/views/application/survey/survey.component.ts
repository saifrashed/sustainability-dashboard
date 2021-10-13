import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

    scoringValue: any[number] = {};

    constructor() {
    }

    ngOnInit(): void {
    }
}
