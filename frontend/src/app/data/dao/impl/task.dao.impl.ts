import {Task} from "../../../models/task";
import {TaskDao} from "../task.dao";
import {Observable, of} from "rxjs";
import {Category} from "../../../models/category";
import {Priority} from "../../../models/priority";
import {TestData} from "../../test.data";

export class TaskDaoImpl implements TaskDao {

  create(object: Task): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Task> {
    // @ts-ignore
      return of(TestData.tasks.find(
        task => task.id === id
      ));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getTotalCount(): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  getUnCompletedCountInCategory(category: Category): Observable<number> {
    // @ts-ignore
    return undefined;
  }

  search(category: Category | null, searchText: string | null, status: boolean| null, priority: Priority | null):
      Observable<Task[]> {

    return of(this.searchTasks(category, searchText, status, priority));
  }

  private searchTasks(category: Category | null, searchText: string|null, status: boolean|null, priority: Priority|null):
      Task[] {
    let allTasks = TestData.tasks;

    if(category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }

    return allTasks;
  }

  update(object: Task): Observable<Task> {
    // @ts-ignore
    return undefined;
  }

}
