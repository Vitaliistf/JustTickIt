import {Injectable} from '@angular/core';
import {Category} from "../models/category";
import {Task} from "../models/task";
import {Observable} from "rxjs";
import {TaskDao} from "../data/dao/task.dao";
import {TaskDaoImpl} from "../data/dao/impl/task.dao.impl";
import {CategoryDao} from "../data/dao/category.dao";
import {CategoryDaoImpl} from "../data/dao/impl/category.dao.impl";
import {Priority} from "../models/priority";
import {PriorityDao} from "../data/dao/priority.dao";
import {PriorityDaoImpl} from "../data/dao/impl/priority.dao.impl";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private taskDao: TaskDao = new TaskDaoImpl();
    private categoryDao: CategoryDao = new CategoryDaoImpl();
    private priorityDao: PriorityDao = new PriorityDaoImpl();

    constructor() {
    }

    getAllTasks(): Observable<Task[]> {
        return this.taskDao.getAll();
    }

    getAllCategories(): Observable<Category[]> {
        return this.categoryDao.getAll();
    }

    getAllPriorities(): Observable<Priority[]> {
      return this.priorityDao.getAll();
    }

    updateTask(task: Task): Observable<Task> {
      return this.taskDao.update(task);
    }

    deleteTask(task: Task): Observable<Task> {
      return this.taskDao.delete(task.id);
    }

    addTask(task: Task): Observable<Task> {
      return this.taskDao.create(task);
    }

    searchTasks(category: Category | null, searchText: string | null, status: boolean | null, priority: Priority | null):
        Observable<Task[]> {
        return this.taskDao.search(category, searchText, status, priority);
    }

    updateCategory(category: Category) {
      return this.categoryDao.update(category);
    }

    deleteCategory(category: Category) {
      return this.categoryDao.delete(category.id);
    }
}
