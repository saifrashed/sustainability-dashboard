import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SurveyResponse} from "../_models/surveyResponse";
import {environment} from '../../environments/environment'
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class SurveyResponseService {

    constructor(private http: HttpClient) {
    }

    findAll() {
        return this.http.get(`${environment.apiUrl}/api/public/survey-response`)
    }

    findAllFaculties(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/api/public/survey-response/faculties`)
    }

    getSurveyResponseStatisticsGlobals() {
        return this.http.get(`${environment.apiUrl}/api/public/survey-response/statistics/global`)
    }

    getSurveyResponseStatisticsGlobalsAcrossTime(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/api/public/survey-response/statistics/global/time`)
    }

    getSurveyResponseStatisticsByFaculty(faculty: string): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/api/public/survey-response/statistics/` + faculty);
    }

    getCompletedSurveys(surveyId: string) {
        return this.http.get(`${environment.apiUrl}/api/public/survey-response/completed/` + surveyId);
    }

    create(surveyResponse: SurveyResponse) {
        return this.http.post(`${environment.apiUrl}/api/public/survey-response`, surveyResponse);
    }

    hasResponded(userId: string, surveyId: string) {
        return this.http.get(`${environment.apiUrl}/api/public/survey-response/status/` + userId + '/' + surveyId);
    }
}
