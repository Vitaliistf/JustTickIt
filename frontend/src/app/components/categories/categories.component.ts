import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Category} from "../../models/category";
import {MatDialog} from "@angular/material/dialog";
import {
  EditCategoryDialogComponent
} from "../../dialog/edit-category-dialog/edit-category-dialog.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories!: Category[];

  @Input()
  selectedCategory!: Category | null;

  @Output()
  selectCategory = new EventEmitter<Category | null>();

  @Output()
  deleteCategory = new EventEmitter<Category | null>();

  @Output()
  updateCategory = new EventEmitter<Category | null>();

  indexMouseMove!: number | null;

  constructor(private dataService: DataService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category | null) {
    if(this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }

  showEditIcon(index: number | null) {
    this.indexMouseMove = index;
  }

  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      maxWidth: '400px',
      data: [category.title, 'Task editing']
    });
    dialogRef.afterClosed().subscribe(result => {

        if(result === 'delete') {
          this.deleteCategory.emit(category);
          return;
        }

        if(typeof result === 'string') {
          category.title = result as string;

          this.updateCategory.emit(category);
          return;
        }

      }
    )
  }
}
