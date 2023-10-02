import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable} from "rxjs";
import {SimpleSearchValue} from "../search/search-objects";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common.service";
import {Category} from "../../models/category";
import {CategoryService} from "../category.service";

export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceImpl extends CommonService<Category> implements CategoryService {

  constructor(@Inject(CATEGORY_URL_TOKEN) private baseUrl: string, httpClient: HttpClient) {
    super(baseUrl, httpClient);
  }

    find(categorySearchValue: SimpleSearchValue | null): Observable<any> {
    return this.httpClient.post<Category[]>(this.baseUrl + '/search', categorySearchValue);
  }
}
