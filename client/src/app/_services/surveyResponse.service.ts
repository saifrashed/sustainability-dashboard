import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SurveyResponse} from "../_models/surveyResponse";

@Injectable({
    providedIn: 'root'
})
export class SurveyResponseService {

    constructor(private http: HttpClient) {
    }

    findAll() {
        return this.http.get('http://localhost:8080/api/public/survey-response')
    }

    findAllFaculties() {
        return this.http.get('http://localhost:8080/api/public/survey-response/faculties')
    }

    getSurveyResponseStatisticsGlobals() {
        return this.http.get('http://localhost:8080/api/public/survey-response/statistics/global')
    }

    getSurveyResponseStatisticsByFaculty(faculty: string) {
        return this.http.get('http://localhost:8080/api/public/survey-response/statistics/' + faculty);
    }

    getCompletedSurveys(surveyId: string) {
        return this.http.get('http://localhost:8080/api/public/survey-response/completed/' + surveyId);
    }

    create(surveyResponse: SurveyResponse) {
        return this.http.post('http://localhost:8080/api/public/survey-response', surveyResponse);
    }

    hasResponded(userId: string, surveyId: string) {
        return this.http.get('http://localhost:8080/api/public/survey-response/status/' + userId + '/' + surveyId);
    }
}
