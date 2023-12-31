import {Observable} from "rxjs";

export interface AbstractService<T> {

  create(object: T): Observable<T>;

  get(id: number): Observable<T>;

  delete(id: number): Observable<T>;

  update(id: number, object: T): Observable<T>;

  getAll(): Observable<T[]>;

}
