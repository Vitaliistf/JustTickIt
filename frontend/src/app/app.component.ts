import {Component, OnInit} from '@angular/core';
import { Task } from './models/task';
import {DataService} from "./services/data.service";
import {Category} from "./models/category";
import {Priority} from "./models/priority";
import {zip} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'JustTickIt';

  tasks!: Task[];

  categories!: Category[];

  selectedCategory: Category | null = null;

  statusFilter!: boolean | null;

  searchTaskText = '';

  priorityFilter!: Priority | null;

  priorities!: Priority[];

  searchCategoryText: string | null = '';

  totalTasksCountInCategory!: number;
  completedCountInCategory!: number;
  uncompletedCountInCategory!: number;
  uncompletedTotalTasksCount!: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getAllCategories().subscribe(
        categories => this.categories = categories
    );
    this.dataService.getAllPriorities().subscribe(
      priorities => this.priorities = priorities
    );

    this.onSelectCategory(null);
  }

  onSelectCategory(category: Category | null) {
    this.selectedCategory = category;
    this.updateTasksAndStats()
  }

  onUpdateTask(task: Task) {
    this.dataService.updateTask(task).subscribe(() => {
      this.updateTasksAndStats();
    })
  }

  onDeleteTask(task: Task) {
    this.dataService.deleteTask(task).subscribe(() => {
      this.updateTasksAndStats();
    })
  }

  onDeleteCategory(category: Category | null) {
    this.dataService.deleteCategory(<Category> category).subscribe(() => {
      this.selectedCategory = null;
      this.onSearchCategory(this.searchCategoryText);
    })
  }

  onUpdateCategory(category: Category | null) {
    this.dataService.updateCategory(<Category> category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText);
    })
  }

  onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  onFilterTasksByStatus(status: null | boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: Priority | null) {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  updateTasks() {
    this.dataService.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe(
      tasks =>
        this.tasks = tasks
    );
  }

  onAddTask(task: Task) {
    this.dataService.addTask(task).subscribe(
      () => this.updateTasksAndStats()
    );
  }

  onAddCategory(title: string | null) {
    this.dataService.addCategory(<string>title).subscribe(
        () => this.updateCategories()
    );
  }

  updateCategories() {
    this.dataService.getAllCategories().subscribe(
        categories => this.categories = categories
    );
  }

  onSearchCategory(title: string | null) {
    this.searchCategoryText = title;

    this.dataService.searchCategories(title).subscribe(
        categories => this.categories = categories
    );
  }

  private updateTasksAndStats() {
    this.updateTasks();
    this.updateStats();
  }

  private updateStats() {
    zip(
        this.dataService.getTotalCountInCategory(this.selectedCategory),
        this.dataService.getCompletedCountInCategory(this.selectedCategory),
        this.dataService.getUncompletedCountInCategory(this.selectedCategory),
        this.dataService.getUncompletedTotalCount()).subscribe( array => {
          this.totalTasksCountInCategory = array[0];
          this.completedCountInCategory = array[1];
          this.uncompletedCountInCategory = array[2];
          this.uncompletedTotalTasksCount = array[3];
        }
    )
  }
}
