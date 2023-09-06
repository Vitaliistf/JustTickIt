import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EditTaskDialogComponent} from './dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ConfirmDialogComponent} from './dialog/confirm-dialog/confirm-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {TaskDatePipe} from './pipes/task-date.pipe';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
  EditCategoryDialogComponent
} from './dialog/edit-category-dialog/edit-category-dialog.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {StatisticsComponent} from './components/statistics/statistics.component';
import {StatCardComponent} from './components/statistics/stat-card/stat-card.component';
import {PrioritiesComponent} from './components/priorities/priorities.component';
import {ColorPickerModule} from "ngx-color-picker";
import {SettingsDialogComponent} from './dialog/settings-dialog/settings-dialog.component';
import {
  EditPriorityDialogComponent
} from './dialog/edit-priority-dialog/edit-priority-dialog.component';
import {HttpClientModule} from "@angular/common/http";
import {TASK_URL_TOKEN} from "./service/impl/task.service";
import {CATEGORY_URL_TOKEN} from "./service/impl/category.service";
import {PRIORITY_URL_TOKEN} from "./service/impl/priority.service";
import {STATISTICS_URL_TOKEN} from "./service/impl/statistics.service";

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    FooterComponent,
    HeaderComponent,
    StatisticsComponent,
    StatCardComponent,
    PrioritiesComponent,
    SettingsDialogComponent,
    EditPriorityDialogComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ColorPickerModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: TASK_URL_TOKEN,
      useValue: 'http://localhost:8080/task'
    },
    {
      provide: CATEGORY_URL_TOKEN,
      useValue: 'http://localhost:8080/category'
    },
    {
      provide: PRIORITY_URL_TOKEN,
      useValue: 'http://localhost:8080/priority'
    },
    {
      provide: STATISTICS_URL_TOKEN,
      useValue: 'http://localhost:8080/statistics'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
