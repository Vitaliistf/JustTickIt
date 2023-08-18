import {Injectable} from '@angular/core';
import {Category} from "../models/category";
import {Task} from "../models/task";
import {TestData} from "../data/test.data";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    tasksSubject = new Subject<Task[]>()

    constructor() {
    }

    getCategories(): Category[] {
        return TestData.categories;
    }

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
