import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Task} from 'src/app/models/task';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['color', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  @ViewChild(MatPaginator, {static:false})
  // @ts-ignore
  private paginator: MatPaginator;

  @ViewChild(MatSort, {static:false})
  // @ts-ignore
  private sort: MatSort;

  // @ts-ignore
  tasks: Task[];

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.tasksSubject.subscribe(tasks => this.tasks = tasks);

    this.refreshTable();
  }

  ngAfterViewInit(): void {
    this.addTableObjects();
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
      this.dataSource.data = this.tasks;

      this.addTableObjects();

      // @ts-ignore
      this.dataSource.sortingDataAccessor = (task, colName) => {
        switch (colName) {
          case 'priority' : {
            return task.priority ? task.priority.id : null;
          }
          case 'category' : {
            return task.category ? task.category.id : null;
          }
          case 'date' : {
            return task.date ? task.date : null;
          }
          case 'title' : {
            return task.title;
          }
        }
      }
  }

  private addTableObjects() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


}
