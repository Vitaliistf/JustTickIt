import {Task} from "src/app/models/task";
import {AbstractService} from "./abstract.service";
import {Observable} from "rxjs";
import {TaskSearchValues} from "./search/search-objects";

export interface TaskService extends AbstractService<Task> {

  find(taskSearchValues: TaskSearchValues): Observable<any>;

}
