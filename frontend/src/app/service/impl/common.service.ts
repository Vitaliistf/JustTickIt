import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AbstractService} from "../abstract.service";

export class CommonService<T> implements AbstractService<T>{
  private readonly url: string;
  protected httpClient: HttpClient;

  constructor(url: string, httpClient: HttpClient) {
    this.url = url;
    this.httpClient = httpClient;
  }

  create(object: T): Observable<T> {
    return this.httpClient.post<T>(this.url, object);
  }

  delete(id: number): Observable<T> {
    return this.httpClient.delete<T>(this.url + '/' + id);
  }

  get(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/' + id);
  }

  getAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }

  update(id: number, object: T): Observable<T> {
    return this.httpClient.put<T>(this.url + '/' + id, object);
  }
}
