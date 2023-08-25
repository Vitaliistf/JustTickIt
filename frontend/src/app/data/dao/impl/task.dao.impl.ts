import {Task} from "../../../models/task";
import {TaskDao} from "../task.dao";
import {EMPTY, Observable, of} from "rxjs";
import {Category} from "../../../models/category";
import {Priority} from "../../../models/priority";
import {TestData} from "../../test.data";

export class TaskDaoImpl implements TaskDao {

  create(object: Task): Observable<Task> {
    if(object.id === 0) {
      object.id = this.getLastTaskId() + 1;
    }
    TestData.tasks.push(object);
    return of(object);
  }

  private getLastTaskId(): number {
    return Math.max.apply(Math, TestData.tasks.map(task => task.id));
  }

  delete(id: number): Observable<Task> {
    let tmpTask: Task | undefined = TestData.tasks.find(t => t.id === id);
    if (tmpTask) {
      TestData.tasks.splice(TestData.tasks.indexOf(tmpTask), 1);
      return of(tmpTask);
    }
    return EMPTY;
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

    if (status != null) {
      allTasks = allTasks.filter(task => task.completed === status);
    }

    if (category != null) {
      allTasks = allTasks.filter(task => task.category === category);
    }

    if (priority != null) {
      allTasks = allTasks.filter(task => task.priority === priority);
    }

    if (searchText != null) {
      allTasks = allTasks.filter(
        task =>
          task.title.toUpperCase().includes(searchText.toUpperCase())
      );
    }

    return allTasks;
  }

  update(object: Task): Observable<Task> {
    const tmpTask = TestData.tasks.find(t => t.id === object.id);
    if (tmpTask instanceof Task) {
      TestData.tasks.splice(TestData.tasks.indexOf(tmpTask), 1, object);
    }

    return of(object);
  }

}
