import {AbstractDao} from "./abstract.dao";
import {Category} from "../../models/category";
import {Observable} from "rxjs";

export interface CategoryDao extends AbstractDao<Category> {

  search(title: string): Observable<Category[]>;

}
