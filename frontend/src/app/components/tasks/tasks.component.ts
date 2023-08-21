import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Task} from 'src/app/models/task';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    tasks: Task[] | undefined;

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.dataService.tasksSubject.subscribe(tasks => this.tasks = tasks);
    }

    toggleTaskCompleted(task : Task) {
      task.completed = !task.completed;
    }

}
