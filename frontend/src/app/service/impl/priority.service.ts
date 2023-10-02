import {Inject, Injectable, InjectionToken} from '@angular/core';
import {PriorityService} from "../priority.service";
import {Priority} from "../../models/priority";
import {Observable} from "rxjs";
import {SimpleSearchValue} from "../search/search-objects";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common.service";

export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
    providedIn: 'root'
})
export class PriorityServiceImpl extends CommonService<Priority> implements PriorityService {

    constructor(@Inject(PRIORITY_URL_TOKEN) private baseUrl: string, httpClient: HttpClient) {
        super(baseUrl, httpClient);
    }

    find(taskSearchValue: SimpleSearchValue): Observable<any> {
        return this.httpClient.post<Priority[]>(this.baseUrl + '/search', taskSearchValue);
    }
}
