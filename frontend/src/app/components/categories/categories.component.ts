import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Category} from "../../models/category";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

    categories: Category[] | undefined;

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.dataService.categoriesSubject.subscribe(
          categories => this.categories = categories
        );
    }

    showTasksByCategory(category: Category) {
        return this.dataService.fillTasksByCategory(category);
    }
}
