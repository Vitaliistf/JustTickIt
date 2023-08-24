import {CategoryDao} from "../category.dao";
import {Category} from "../../../models/category";
import {EMPTY, Observable, of} from "rxjs";
import {TestData} from "../../test.data";

export class CategoryDaoImpl implements CategoryDao {

  create(object: Category): Observable<Category> {
    // @ts-ignore
    return undefined;
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = undefined;
      }
    });

    const tmpCategory = TestData.categories.find(t => t.id === id);
    if (tmpCategory) {
      TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1);
      return of(tmpCategory);
    }
    return EMPTY;
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
    const tmpCategory = TestData.categories.find(t => t.id === object.id);
    if (tmpCategory) {
      TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, object);
      return of(tmpCategory);
    }
    return EMPTY;
  }

}
