import {Injectable} from '@angular/core';
import {Survey} from "../_models/survey";
import {HttpClient} from '@angular/common/http';
import {SurveyQuestion} from "../_models/surveyQuestion";

import {environment} from '../../environments/environment'


@Injectable({
    providedIn: 'root'
})
export class SurveyService {

    constructor(private http: HttpClient) {
    }

    findAll() {
        return this.http.get(`${environment.apiUrl}/api/public/survey`)
    }

    findById(id: string) {
        return this.http.get(`${environment.apiUrl}/api/public/survey/` + id);
    }

    findAllQuestions(id: string) {
        return this.http.get(`${environment.apiUrl}/api/public/survey/questions/` + id);
    }

    create(survey: Survey) {
        return this.http.post(`${environment.apiUrl}/api/public/survey`, survey);
    }

    createQuestion(surveyQuestion: SurveyQuestion) {
        return this.http.post(`${environment.apiUrl}/api/public/survey-question`, surveyQuestion);
    }


}
