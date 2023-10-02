import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../models/category";
import {MatDialog} from "@angular/material/dialog";
import {
  EditCategoryDialogComponent
} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {SimpleSearchValue} from "../../service/search/search-objects";
import {DialogAction} from "../../dialog/dialog-result";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input('selectedCategory')
  set setCategory(selectedCategory: Category | null) {
    this.selectedCategory = selectedCategory;
  }

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('categorySearchValue')
  set setCategorySearchValue(categorySearchValues: SimpleSearchValue) {
    this.categorySearchValue = categorySearchValues;
  }

  @Input('uncompletedTotal')
  set uncompletedCount(uncompletedCountForCategoryAll: number) {
    this.uncompletedTotal = uncompletedCountForCategoryAll;
  }

  @Output()
  selectCategory = new EventEmitter<Category | null>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<Category>();

  @Output()
  searchCategory = new EventEmitter<SimpleSearchValue>();

  selectedCategory!: Category | null;
  indexMouseMove!: number;
  showEditIconCategory!: boolean;
  categories!: Category[];
  categorySearchValue!: SimpleSearchValue;
  uncompletedTotal!: number;
  filterTitle: string = '';
  filterChanged: boolean = false;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() : void {
  }

  search(): void {
    this.filterChanged = false;

    if (!this.categorySearchValue) {
      return;
    }

    this.categorySearchValue.title = this.filterTitle;
    this.searchCategory.emit(this.categorySearchValue);

  }

  showCategory(category: Category | null) : void {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;
    this.selectCategory.emit(this.selectedCategory);
  }

  showEditIcon(show: boolean, index: number) : void {
    this.indexMouseMove = index;
    this.showEditIconCategory = show;
  }

  clearAndSearch() : void {
    this.filterTitle = '';
    this.search();
  }

  checkFilterChanged() : boolean {
    this.filterChanged = this.filterTitle !== this.categorySearchValue.title;
    return this.filterChanged;
  }

  openAddDialog() : void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [new Category(0, ''), 'Add category'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.addCategory.emit(result.obj as Category);
      }
    });
  }

  openEditDialog(category: Category) : void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [new Category(category.id, category.title), 'Edit category'], width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      if (result.action === DialogAction.DELETE) {
        this.deleteCategory.emit(category);
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.updateCategory.emit(result.obj as Category);
        return;
      }
    });
  }
}
