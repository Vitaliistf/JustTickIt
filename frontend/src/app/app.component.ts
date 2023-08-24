import {Component, OnInit} from '@angular/core';
import { Task } from './models/task';
import {DataService} from "./services/data.service";
import {Category} from "./models/category";

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

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getAllCategories().subscribe(
        categories => this.categories = categories
    );

    this.onSelectCategory(null);
  }

  onSelectCategory(category: Category | null) {
    this.selectedCategory = category;
    this.dataService.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
    ).subscribe(
      tasks =>
        this.tasks = tasks
    );
  }

  onUpdateTask(task: Task) {
    this.dataService.updateTask(task).subscribe(() => {
      this.dataService.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks =>
        this.tasks = tasks
      )
    })
  }

  onDeleteTask(task: Task) {
    this.dataService.deleteTask(task).subscribe(() => {
      this.dataService.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks =>
        this.tasks = tasks
      )
    })
  }
}
