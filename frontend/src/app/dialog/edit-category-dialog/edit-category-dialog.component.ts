import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {OperationType} from "../operation-type";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css']
})
export class EditCategoryDialogComponent implements OnInit{

  constructor(private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [string, string, OperationType],
              private dialog: MatDialog) {
  }

  dialogTitle!: string;
  categoryTitle!: string;
  operationType!: OperationType;

  ngOnInit(): void {
    this.categoryTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operationType = this.data[2];
  }

  onConfirm() {
    this.dialogRef.close(this.categoryTitle);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `Do you confirm deletion of task: "${this.categoryTitle}"?(Tasks will be not deleted)`
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dialogRef.close('delete');
      }
    })
  }

  canDelete(): boolean {
    return this.operationType === OperationType.EDIT;
  }

}
