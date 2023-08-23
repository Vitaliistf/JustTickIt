import {CategoryDao} from "../category.dao";
import {Category} from "../../../models/category";
import {Observable, of} from "rxjs";
import {TestData} from "../../test.data";

export class CategoryDaoImpl implements CategoryDao {

  create(object: Category): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  get(id: number): Observable<Category> {
    // @ts-ignore
    return of(TestData.categories.find(
        category => category.id === id
    ));
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    // @ts-ignore
    return undefined;
  }

  update(object: Category): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

}
