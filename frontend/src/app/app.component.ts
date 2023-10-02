import {Component, OnInit} from '@angular/core';
import {Task} from './models/task';
import {Category} from "./models/category";
import {Priority} from "./models/priority";
import {Observable} from "rxjs";
import {SimpleSearchValue, TaskSearchValues} from "./service/search/search-objects";
import {Statistics} from "./models/statistics";
import {DashboardData} from "./dialog/dashboard-data";
import {PageEvent} from "@angular/material/paginator";
import {TaskServiceImpl} from "./service/impl/task.service";
import {CategoryServiceImpl} from "./service/impl/category.service";
import {PriorityServiceImpl} from "./service/impl/priority.service";
import {StatisticsServiceImpl} from "./service/impl/statistics.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  selectedCategory: Category | null = null;
  showStatistics = true;
  showSearch = true;
  tasks!: Task[];
  priorities!: Priority[];
  categories!: Category[];
  stat!: Statistics;
  dash: DashboardData = new DashboardData();
  uncompletedCountForCategoryAll!: number;
  totalTasksFound!: number;
  taskSearchValues = new TaskSearchValues();
  categorySearchValue = new SimpleSearchValue();
  menuOpened = true;

  constructor(
    private taskService: TaskServiceImpl,
    private categoryService: CategoryServiceImpl,
    private priorityService: PriorityServiceImpl,
    private statService: StatisticsServiceImpl
  ) {
    this.statService.getStatistics().subscribe((result => {
      this.stat = result;
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal;

      this.fillAllCategories().subscribe(res => {
        this.categories = res;

        this.selectCategory(this.selectedCategory);
      });
    }));
  }


  ngOnInit(): void {
    this.fillAllPriorities();
  }

  fillAllPriorities() {
    this.priorityService.getAll().subscribe(result => {
      this.priorities = result;
    });
  }

  fillAllCategories(): Observable<Category[]> {
    return this.categoryService.getAll();
  }

    fillDashData(completedCount: number | undefined, uncompletedCount: number | undefined) {
    this.dash.completedTotal = completedCount;
    this.dash.uncompletedTotal = uncompletedCount;
  }

  selectCategory(category: Category | null) {

    if (category) {
      this.fillDashData(category.completedCount, category.uncompletedCount);
    } else {
      this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal);
    }

    this.taskSearchValues.pageNumber = 0;

    this.selectedCategory = category;

    this.taskSearchValues.categoryId = category ? category.id : null;

    this.searchTasks(this.taskSearchValues);
  }

  addCategory(category: Category | null) {
    if (category != null) {
        this.categoryService.create(category).subscribe(() => {
                this.searchCategory(this.categorySearchValue);
            }
        );
    }
  }

  deleteCategory(category: Category | null) {
    if (category != null) {
        this.categoryService.delete(category.id).subscribe(() => {
            this.selectedCategory = null;

            this.searchCategory(this.categorySearchValue);
            this.selectCategory(this.selectedCategory);

        });
    }
  }

  updateCategory(category: Category | null) {
    if (category != null) {
      this.categoryService.update(category.id, category).subscribe(() => {
        this.searchCategory(this.categorySearchValue);
        this.searchTasks(this.taskSearchValues);
      });
    }
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }

  onClosedMenu() {
    this.menuOpened = false;
  }

    searchCategory(categorySearchValues: SimpleSearchValue | null) {
    this.categoryService.find(categorySearchValues).subscribe(result => {
      this.categories = result;
    });
  }

  toggleStat(showStat: boolean) {
    this.showStatistics = showStat;
  }

  toggleSearch(showSearch: boolean) {
    this.showSearch = showSearch;
  }

  searchTasks(searchTaskValues: TaskSearchValues) {

    this.taskSearchValues = searchTaskValues;

    this.taskService.find(this.taskSearchValues).subscribe(result => {
      if (result.totalPages > 0 && this.taskSearchValues.pageNumber >= result.totalPages) {
        this.taskSearchValues.pageNumber = 0;
        this.searchTasks(this.taskSearchValues);
      }

      this.totalTasksFound = result.totalElements;
      this.tasks = result.content;
    });
  }

  updateOverallCounter() {

    this.statService.getStatistics().subscribe((res => {
      this.stat = res;
      this.uncompletedCountForCategoryAll = this.stat.uncompletedTotal;

      if (!this.selectedCategory) {
        this.fillDashData(this.stat.completedTotal, this.stat.uncompletedTotal);
      }

    }));

  }

  updateCategoryCounter(category: Category) {
    this.categoryService.get(category.id).subscribe(cat => {

      this.categories[this.getCategoryIndex(category)] = cat;

      this.showCategoryDashboard(cat);
    });
  }

  showCategoryDashboard(cat: Category) {
    if (this.selectedCategory && this.selectedCategory.id === cat.id) {
      this.fillDashData(cat.completedCount, cat.uncompletedCount);
    }
  }

  addTask(task: Task) {
    this.taskService.create(task).subscribe(() => {

      if (task.category) {
        this.updateCategoryCounter(task.category);
      }

      this.updateOverallCounter();

      this.searchTasks(this.taskSearchValues);
    });
  }

  deleteTask(task: Task) {
    this.taskService.delete(task.id).subscribe(() => {

      if (task.category) {
        this.updateCategoryCounter(task.category);
      }

      this.updateOverallCounter();

      this.searchTasks(this.taskSearchValues);

    });
  }

  updateTask(task: Task) {
    this.taskService.update(task.id, task).subscribe(() => {

      if (task.oldCategory) {
        this.updateCategoryCounter(task.oldCategory);
      }

      if (task.category) {
        this.updateCategoryCounter(task.category);
      }

      this.updateOverallCounter();

      this.searchTasks(this.taskSearchValues);
    });
  }

  paging(pageEvent: PageEvent) {
    if (this.taskSearchValues.pageSize !== pageEvent.pageSize) {
      this.taskSearchValues.pageNumber = 0;
    } else {
      this.taskSearchValues.pageNumber = pageEvent.pageIndex;
    }

    this.taskSearchValues.pageSize = pageEvent.pageSize;
    this.taskSearchValues.pageNumber = pageEvent.pageIndex;

    this.searchTasks(this.taskSearchValues);
  }

  settingsChanged(priorities: Priority[]) {
    this.priorities = priorities;
    this.searchTasks(this.taskSearchValues);
  }

  getCategoryIndex(category: Category): number {
    const tmpCategory = this.categories.find(t => t.id === category.id);
    return this.categories.indexOf(<Category>tmpCategory);
  }
}
