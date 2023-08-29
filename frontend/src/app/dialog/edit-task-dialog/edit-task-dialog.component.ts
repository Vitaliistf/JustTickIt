import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Task} from 'src/app/models/task';
import {DataService} from "../../services/data.service";
import {Category} from "../../models/category";
import {Priority} from "../../models/priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {OperationType} from "../operation-type";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperationType],
    private dataService: DataService,
    private dialog: MatDialog
  ) {

  }

  categories!: Category[];
  priorities!: Priority[];

  dialogTitle!: string;
  task!: Task;
  operationType!: OperationType;

  tmpTitle!: string;
  tmpCategory!: Category | undefined;
  tmpPriority!: Priority | undefined;
  tmpDate!: Date | undefined;

  ngOnInit() {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operationType = this.data[2];

    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpDate = this.task.date;

    this.dataService.getAllCategories().subscribe(items => this.categories = items);
    this.dataService.getAllPriorities().subscribe(items => this.priorities = items);
  }

  onConfirm() {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;

    this.dialogRef.close(this.task);
  }
  onCancel() {
    this.dialogRef.close(null);
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `Do you confirm deletion of task: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dialogRef.close('delete');
      }
    })
  }

  activate() {
    this.dialogRef.close('activate');
  }

  complete() {
    this.dialogRef.close('complete');
  }

  canDelete(): boolean {
    return this.operationType === OperationType.EDIT;
  }
}
