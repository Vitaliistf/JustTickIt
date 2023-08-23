import {Observable} from "rxjs";

export interface AbstractDao<T> {

  create(object: T): Observable<T>;

  get(id: number): Observable<T>;

  delete(id: number): Observable<T>;

  update(object: T): Observable<T>;

  getAll(): Observable<T[]>;

}
