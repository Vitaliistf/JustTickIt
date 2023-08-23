import {Injectable} from '@angular/core';
import {Category} from "../models/category";
import {Task} from "../models/task";
import {TestData} from "../data/test.data";
import {Observable} from "rxjs";
import {TaskDao} from "../data/dao/task.dao";
import {TaskDaoImpl} from "../data/dao/impl/task.dao.impl";
import {CategoryDao} from "../data/dao/category.dao";
import {CategoryDaoImpl} from "../data/dao/impl/category.dao.impl";
import {Priority} from "../models/priority";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private taskDao: TaskDao = new TaskDaoImpl();
    private categoryDao: CategoryDao = new CategoryDaoImpl();

    constructor() {
    }

    getAllTasks(): Observable<Task[]> {
        return this.taskDao.getAll();
    }

    getAllCategories(): Observable<Category[]> {
        return this.categoryDao.getAll();
    }

    searchTasks(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null):
        Observable<Task[]> {
        return this.taskDao.search(category, searchText, status, priority);
    }

}
