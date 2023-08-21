import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Task} from 'src/app/models/task';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['color', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  tasks: Task[] | undefined;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.tasksSubject.subscribe(tasks => this.tasks = tasks);

    this.refreshTable();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  getPriorityColor(task: Task) {
    if(task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff';
  }

    private refreshTable() {
      // @ts-ignore
      this.dataSource.data = this.tasks;
  }
}
