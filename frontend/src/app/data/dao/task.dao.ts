import { Task } from "src/app/models/task";
import {AbstractDao} from "./abstract.dao";
import {Category} from "../../models/category";
import {Priority} from "../../models/priority";
import {Observable} from "rxjs";

export interface TaskDao extends AbstractDao<Task> {

  search(category: Category | null, searchText: string | null, status: boolean| null, priority: Priority | null):
    Observable<Task[]>;

  getCompletedCountInCategory(category: Category): Observable<number>;

  getUnCompletedCountInCategory(category: Category): Observable<number>;

  getTotalCountInCategory(category: Category): Observable<number>;

  getTotalCount(): Observable<number>;

}
