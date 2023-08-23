import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
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
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['color', 'title', 'date', 'priority', 'category'];

  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, {static:false})
  private paginator!: MatPaginator;

  @ViewChild(MatSort, {static:false})
  private sort!: MatSort;

  tasks!: Task[];

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    // this.dataService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
  }

  getPriorityColor(task: Task) {
    if (task.completed) {
      return '#F8F9FA';
    }
    if(task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#fff';
  }

    private fillTable() {

      if(!this.dataSource) {
        return;
      }

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

  private onClickTask(task: Task) {
    this.updateTask.emit(task);
  }

}
