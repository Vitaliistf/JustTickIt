import {Component, OnInit} from '@angular/core';
import {Task} from './models/task';
import {Category} from "./models/category";
import {Priority} from "./models/priority";
import {concatMap, map, zip} from "rxjs";
import {CategoryService} from "./service/category.service";
import {CategoryServiceImpl} from "./service/impl/category.service";
import {SimpleSearchValue} from "./service/search/search-objects";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'JustTickIt';

  tasks!: Task[];

  categories!: Category[];

  selectedCategory: Category | null = null;

  statusFilter!: boolean | null;

  searchTaskText = '';

  priorityFilter!: Priority | null;

  priorities!: Priority[];

  categorySearchValue: SimpleSearchValue = new SimpleSearchValue();

  totalTasksCountInCategory!: number;
  completedCountInCategory!: number;
  uncompletedCountInCategory!: number;
  uncompletedTotalTasksCount!: number;

  showStatistics = true;

  constructor(private categoryService: CategoryServiceImpl) {
  }

  ngOnInit() {
    // this.dataService.getAllPriorities().subscribe(
    //   priorities => this.priorities = priorities
    // );
    // this.dataService.getAllCategories().subscribe(
    //   categories => this.categories = categories
    // );

    this.updateCategories();

    this.onSelectCategory(null);
  }

  updateCategories() {

    this.categoryService.getAll().subscribe(result => {
      this.categories = result;
    });
    // if (this.categoryMap) {
    //   this.categoryMap.clear();
    // }
    //
    // this.categories = this.categories.sort(
    //   (a, b) => a.title.localeCompare(b.title)
    // );

    // this.categories.forEach(cat => {
    //   this.dataService.getUncompletedCountInCategory(cat).subscribe(
    //     count => this.categoryMap.set(cat, count)
    //   );
    // });
  }

  onSelectCategory(category: Category | null) {
    this.selectedCategory = category;
    this.updateTasksAndStats()
  }

  onUpdateTask(task: Task) {
    // this.dataService.updateTask(task).subscribe(() => {
    //   this.updateCategories();
    //   this.updateTasksAndStats();
    // })
  }

  onDeleteTask(task: Task) {
    // this.dataService.deleteTask(task).pipe(
    //   concatMap(t => {
    //     return this.dataService.getUncompletedCountInCategory(t.category ? t.category : null)
    //       .pipe(map(count => {
    //         return ({t: task, count});
    //       }));
    //   })).subscribe(result => {
    //     const t = result.t;
    //   if (t.category) {
    //     this.categoryMap.set(t.category, result.count);
    //   }
    //   this.updateTasksAndStats();
    // })
  }

  onDeleteCategory(category: Category | null) {
    // this.dataService.deleteCategory(<Category>category).subscribe(cat => {
    //   this.selectedCategory = null;
    //   this.categoryMap.delete(cat);
    //   this.onSearchCategory(this.searchCategoryText);
    //   this.updateTasks();
    // })
  }

  onUpdateCategory(category: Category | null) {
    // this.dataService.updateCategory(<Category>category).subscribe(() => {
    //   this.onSearchCategory(this.searchCategoryText);
    // })
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
    // this.dataService.searchTasks(
    //   this.selectedCategory,
    //   this.searchTaskText,
    //   this.statusFilter,
    //   this.priorityFilter
    // ).subscribe(
    //   tasks =>
    //     this.tasks = tasks
    // );
  }

  onAddTask(task: Task) {
    // this.dataService.addTask(task).pipe(
    //   concatMap(t => {
    //     return this.dataService.getUncompletedCountInCategory(t.category ? t.category : null)
    //       .pipe(map(count => {
    //         return ({t: task, count});
    //       }));
    //   })).subscribe(result => {
    //   const t = result.t;
    //   if (t.category) {
    //     this.categoryMap.set(t.category, result.count);
    //   }
    //   this.updateTasksAndStats();
    // })
  }

  onAddCategory(title: string | null) {
    // this.dataService.addCategory(<string>title).subscribe(
    //   () => this.updateCategories()
    // );
  }

  onSearchCategory(categorySearchValue: SimpleSearchValue | null) {
    this.categoryService.find(categorySearchValue).subscribe(
      categories => this.categories = categories
    );
  }

  private updateTasksAndStats() {
    this.updateTasks();
    this.updateStats();
  }

  private updateStats() {
    // zip(
    //   this.dataService.getTotalCountInCategory(this.selectedCategory),
    //   this.dataService.getCompletedCountInCategory(this.selectedCategory),
    //   this.dataService.getUncompletedCountInCategory(this.selectedCategory),
    //   this.dataService.getUncompletedTotalCount()).subscribe(array => {
    //     this.totalTasksCountInCategory = array[0];
    //     this.completedCountInCategory = array[1];
    //     this.uncompletedCountInCategory = array[2];
    //     this.uncompletedTotalTasksCount = array[3];
    //   }
    // )
  }

  toggleStatistics(showStatistics: boolean) {
    this.showStatistics = showStatistics;
  }
}
