import {
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
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../models/category";
import {Priority} from "../../models/priority";
import {OperationType} from "../../dialog/operation-type";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] =
    ['color', 'title', 'date', 'priority', 'category', 'operations', 'select'];

  dataSource!: MatTableDataSource<Task>;

  @ViewChild(MatPaginator, {static:false})
  private paginator!: MatPaginator;

  @ViewChild(MatSort, {static:false})
  private sort!: MatSort;

  tasks!: Task[];

  selectedStatusFilter: boolean | null = null;
  priorities!: Priority[];

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input()
  selectedCategory!: Category | null;

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  addTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category | null>();

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean | null>;

  @Output()
  filterByPriority = new EventEmitter<Priority | null>;

  searchTaskText!: string;

  selectedPriorityFilter: Priority | null = null;

  constructor(private dataService: DataService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.dataService.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataSource = new MatTableDataSource();
    this.onSelectCategory(null);
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

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      maxWidth: '600px',
      data: [task, 'Task editing', OperationType.EDIT],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {

      if(result === 'complete') {
        task.completed = true;
        return;
      }

      if(result === 'activate') {
        task.completed = false;
        return;
      }

      if(result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if(result as Task) {
        this.updateTask.emit(task);
        return;
      }
      }
    )
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `Do you confirm deletion of task: "${task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteTask.emit(task);
      }
    })
  }

  onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  onSelectCategory(category: Category | null) {
    this.selectCategory.emit(category);
  }

  onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText);
  }

  onFilterByStatus(value: boolean | null) {
    if(value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  onFilterByPriority(value: Priority | null) {
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  openAddTaskDialog() {
    const task = new Task(0, '', false, undefined, this.selectedCategory == null ? undefined : this.selectedCategory);
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      maxWidth: '600px',
      data: [task, 'Task editing', OperationType.ADD],
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.addTask.emit(task);
        }
      }
    )
  }
}
