import {StatisticsService} from "../statistics.service";
import {Observable} from "rxjs";
import {Statistics} from "../../models/statistics";
import {HttpClient} from "@angular/common/http";
import {Inject, Injectable, InjectionToken} from "@angular/core";

export const STATISTICS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
    providedIn: 'root'
})
export class StatisticsServiceImpl implements StatisticsService {

    constructor(@Inject(STATISTICS_URL_TOKEN) private baseUrl: string,
                private httpClient: HttpClient) {
    }

    getStatistics(): Observable<Statistics> {
        return this.httpClient.get<Statistics>(this.baseUrl);
    }

}

