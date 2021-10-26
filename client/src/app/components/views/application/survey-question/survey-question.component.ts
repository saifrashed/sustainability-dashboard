import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-survey-question',
    templateUrl: './survey-question.component.html',
    styleUrls: ['./survey-question.component.css']
})
export class SurveyQuestionComponent implements OnInit {

    @Input() scoringDescription: any[] = [];
    @Input() question: any;

    @Output() newScoringValue = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    addOrUpdateScoring(value: any) {
        let scoringObject = {
            question: this.question,
            value: parseInt(value.target.value),
            weight: this.question.weight
        };

        this.newScoringValue.emit(scoringObject);
    }

}
