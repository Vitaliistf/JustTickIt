import {Inject, Injectable, InjectionToken} from '@angular/core';
import {TaskService} from "../task.service";
import {Task} from "../../models/task";
import {Observable} from "rxjs";
import {TaskSearchValues} from "../search/search-objects";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common.service";

export const TASK_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class TaskServiceImpl extends CommonService<Task> implements TaskService {

  constructor(@Inject(TASK_URL_TOKEN) private baseUrl: string, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }

  find(taskSearchValues: TaskSearchValues): Observable<any> {
    return this.httpClient.post<Task[]>(this.baseUrl + '/search', taskSearchValues);
  }
}
