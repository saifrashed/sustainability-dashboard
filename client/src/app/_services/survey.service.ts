import {Injectable} from '@angular/core';
import {Survey} from "../_models/survey";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {SurveyQuestion} from "../_models/surveyQuestion";

@Injectable({
    providedIn: 'root'
})
export class SurveyService {

    constructor(private http: HttpClient) {
    }

    findAll() {
       return this.http.get('http://localhost:8080/api/public/survey')
    }

    findById(id: string) {
        return this.http.get('http://localhost:8080/api/public/survey/' + id);
    }

    findAllQuestions(id: string) {
        return this.http.get('http://localhost:8080/api/public/survey/questions/' + id);
    }

    create(survey: Survey) {
        return this.http.post('http://localhost:8080/api/public/survey', survey);
    }

    createQuestion(surveyQuestion: SurveyQuestion) {
        return this.http.post('http://localhost:8080/api/public/survey-question', surveyQuestion);
    }


}
