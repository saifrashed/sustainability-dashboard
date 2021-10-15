import {Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit, OnChanges {

  @Input() scoringValue: any[number] = {};
  @Input() scoringDescription: string[] = ["Adhoc", "Coherent", "Systemic", "Chain-oriented", "Example for others"];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.scoringDescriptionString();
    console.log(this.scoringDescription)
  }

  scoringDescriptionString() {

    if (this.scoringValue.value == 0) {
      this.scoringDescription[0]
    }
    if (this.scoringValue.value == 1) {
      this.scoringDescription[1]
    }
    if (this.scoringValue.value == 2) {
      this.scoringDescription[2]
    }
    if (this.scoringValue == 3) {
      this.scoringDescription[3]
    }
    if (this.scoringValue == 4) {
      this.scoringDescription[4]
    }
  }
}
