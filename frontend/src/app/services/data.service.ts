import {Injectable} from '@angular/core';
import {Category} from "../models/category";
import {Task} from "../models/task";
import {TestData} from "../data/test.data";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
    categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

    constructor() {
      this.fillTasks();
    }

    // getCategories(): Category[] {
    //     return TestData.categories;
    // }

    fillTasks() {
        this.tasksSubject.next(TestData.tasks);
    }

    fillTasksByCategory(category: Category) {
        const tasks = TestData.tasks.filter(
            task => task.category === category
        );
        this.tasksSubject.next(tasks);
    }

}
