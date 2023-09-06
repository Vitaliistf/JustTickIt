import {AbstractService} from "./abstract.service";
import {Category} from "../models/category";
import {Observable} from "rxjs";
import {SimpleSearchValue} from "./search/search-objects";

export interface CategoryService extends AbstractService<Category> {

    find(categorySearchValue: SimpleSearchValue | null): Observable<any>;

}
