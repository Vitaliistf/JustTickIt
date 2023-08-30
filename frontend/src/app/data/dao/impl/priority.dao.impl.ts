import {PriorityDao} from "../priority.dao";
import {Priority} from "../../../models/priority";
import {EMPTY, Observable, of} from "rxjs";
import {TestData} from "../../test.data";

export class PriorityDaoImpl implements PriorityDao {

  create(object: Priority): Observable<Priority> {
    if(object.id === 0) {
      object.id = this.getLastPriorityId() + 1;
    }
    TestData.priorities.push(object);
    return of(object);
  }

  private getLastPriorityId(): number {
    return Math.max.apply(Math, TestData.priorities.map(priority => priority.id));
  }

  delete(id: number): Observable<Priority> {
    TestData.tasks.forEach(task => {
      if(task.priority && task.priority.id === id) {
        task.priority = undefined;
      }
    })

    let tmpPriority: Priority | undefined = TestData.priorities.find(p => p.id === id);
    if (tmpPriority) {
      TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1);
      return of(tmpPriority);
    }
    return EMPTY;
  }

  get(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(object: Priority): Observable<Priority> {
    const tmpPriority = TestData.priorities.find(priority => priority.id === object.id);
    if (tmpPriority instanceof Priority) {
      TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1, object);
    }

    return of(object);
  }

}
