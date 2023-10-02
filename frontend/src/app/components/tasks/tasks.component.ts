import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from 'src/app/models/task';
import {MatTableDataSource} from "@angular/material/table";
import {PageEvent} from "@angular/material/paginator";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../models/category";
import {Priority} from "../../models/priority";
import {TaskSearchValues} from "../../service/search/search-objects";
import {DialogAction} from "../../dialog/dialog-result";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] =
    ['color', 'title', 'date', 'priority', 'category', 'operations', 'select'];

  @Input()
  totalTasksFound!: number;

  @Input()
  selectedCategory!: Category | null;

  @Input()
  showSearch!: boolean;

  @Input('tasks')
  set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.assignTableSource();
  }

  @Input('taskSearchValues')
  set setTaskSearchValues(taskSearchValues: TaskSearchValues) {
    this.taskSearchValues = taskSearchValues;
    this.initSearchValues();
    this.initSortDirectionIcon();
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Output()
  addTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  paging = new EventEmitter<PageEvent>();

  @Output()
  searchAction = new EventEmitter<TaskSearchValues>();

  @Output()
  toggleSearch = new EventEmitter<boolean>();

  priorities!: Priority[];
  categories!: Category[];

  tasks!: Task[];

  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  changed = false;

  readonly defaultSortColumn = 'title';
  readonly defaultSortDirection = 'asc';

  filterTitle!: string;
  filterCompleted!: number | null;
  filterPriorityId!: number | null;
  filterSortColumn!: string;
  filterSortDirection!: string;

  taskSearchValues!: TaskSearchValues;

  sortIconName!: string;

  readonly iconNameDown = 'arrow_downward';
  readonly iconNameUp = 'arrow_upward';

  readonly colorCompletedTask = '#F8F9FA';
  readonly colorWhite = '#fff';


  constructor(private dialog: MatDialog) {
  }


  ngOnInit() {
  }

  assignTableSource() {
    if (!this.dataSource) {
      return;
    }
    this.dataSource.data = this.tasks;
  }

  openAddDialog() {

    let category = this.selectedCategory == null ? undefined : this.selectedCategory;

    const task = new Task(0, '', false, undefined, category);

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Add task', this.categories, this.priorities]
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.addTask.emit(task);
      }
    });
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Edit task', this.categories, this.priorities],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }


      if (result.action === DialogAction.DELETE) {
        this.deleteTask.emit(task);
        return;
      }

      if (result.action === DialogAction.COMPLETE) {
        task.completed = true;
        this.updateTask.emit(task);
      }


      if (result.action === DialogAction.ACTIVATE) {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.updateTask.emit(task);
        return;
      }
    });
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Confirm action', message: `Delete task: "${task.title}"?`},
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.OK) {
        this.deleteTask.emit(task);
      }
    });
  }

  onToggleCompleted(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  getPriorityColor(task: Task) {
    if (task.completed) {
      return this.colorCompletedTask;
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return this.colorWhite;
  }
  pageChanged(pageEvent: PageEvent) {
    this.paging.emit(pageEvent);
  }

  initSearch() {
    this.taskSearchValues.title = this.filterTitle;
    this.taskSearchValues.completed = this.filterCompleted;
    this.taskSearchValues.priorityId = this.filterPriorityId;
    this.taskSearchValues.sortColumn = this.filterSortColumn;
    this.taskSearchValues.sortDirection = this.filterSortDirection;

    this.searchAction.emit(this.taskSearchValues);

    this.changed = false;
  }

  checkFilterChanged() {

    this.changed = this.taskSearchValues.title !== this.filterTitle;

    if (this.taskSearchValues.completed !== this.filterCompleted) {
      this.changed = true;
    }

    if (this.taskSearchValues.priorityId !== this.filterPriorityId) {
      this.changed = true;
    }

    if (this.taskSearchValues.sortColumn !== this.filterSortColumn) {
      this.changed = true;
    }

    if (this.taskSearchValues.sortDirection !== this.filterSortDirection) {
      this.changed = true;
    }

    return this.changed;
  }

  initSortDirectionIcon() {

    if (this.filterSortDirection === 'desc') {
      this.sortIconName = this.iconNameDown;
    } else {
      this.sortIconName = this.iconNameUp;
    }
  }

  changedSortDirection() {

    if (this.filterSortDirection === 'asc') {
      this.filterSortDirection = 'desc';
    } else {
      this.filterSortDirection = 'asc';
    }

    this.initSortDirectionIcon();
  }

  initSearchValues() {
    if (!this.taskSearchValues) {
      return;
    }
    this.filterTitle = this.taskSearchValues.title;
    this.filterCompleted = this.taskSearchValues.completed;
    this.filterPriorityId = this.taskSearchValues.priorityId;
    this.filterSortColumn = this.taskSearchValues.sortColumn;
    this.filterSortDirection = this.taskSearchValues.sortDirection;
  }

  clearSearchValues() {
    this.filterTitle = '';
    this.filterCompleted = null;
    this.filterPriorityId = null;
    this.filterSortColumn = this.defaultSortColumn;
    this.filterSortDirection = this.defaultSortDirection;
  }

  onToggleSearch() {
    this.toggleSearch.emit(!this.showSearch);
  }
}
