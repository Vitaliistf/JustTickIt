import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../models/category";
import {MatDialog} from "@angular/material/dialog";
import {
    EditCategoryDialogComponent
} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {OperationType} from "../../dialog/operation-type";
import {SimpleSearchValue} from "../../service/search/search-objects";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  selectedCategory!: Category | null;

  @Input()
  categories!: Category[];

  @Input()
  uncompletedTotal!: number;

  @Input()
  categorySearchValue!: SimpleSearchValue | null;

  @Output()
  selectCategory = new EventEmitter<Category | null>();

  @Output()
  deleteCategory = new EventEmitter<Category | null>();

  @Output()
  updateCategory = new EventEmitter<Category | null>();

  @Output()
  addCategory = new EventEmitter<string | null>();

  @Output()
  searchCategory = new EventEmitter<SimpleSearchValue | null>();

  filterTitle!: string;

  indexMouseMove!: number | null;

  constructor(private dialog: MatDialog
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
      width: '400px',
      data: [category.title, 'Category editing', OperationType.EDIT]
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

  openAddDialog() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '400px',
      data: ['', 'Add category', OperationType.ADD]
    });
    dialogRef.afterClosed().subscribe(result => {

        if(result) {
          this.addCategory.emit(result as string);
          return;
        }

      }
    )
  }
  search() {
    if(!this.categorySearchValue) {
      return;
    }
    this.categorySearchValue.title = this.filterTitle;
    this.searchCategory.emit(this.categorySearchValue);
  }

  clearAndSearch() {
    this.filterTitle = '';
    this.search();
  }

}
