import {PriorityDao} from "../priority.dao";
import {Priority} from "../../../models/priority";
import {Observable, of} from "rxjs";
import {TestData} from "../../test.data";

export class PriorityDaoImpl implements PriorityDao {

  create(object: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(object: Priority): Observable<Priority> {
    // @ts-ignore
    return undefined;
  }

}
