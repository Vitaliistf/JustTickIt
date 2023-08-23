import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Category} from "../../models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories!: Category[];

  @Output()
  selectCategory = new EventEmitter<Category>();

  selectedCategory!: Category;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category) {
    if(this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }
}
