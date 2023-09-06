import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OperationType} from "../operation-type";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {

  dialogTitle!: string;
  priorityTitle!: string;
  operationType!: OperationType;

  ngOnInit(): void {
    this.priorityTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operationType = this.data[2];
  }

  constructor(private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: [string, string, OperationType],
              private dialog: MatDialog) {
  }

  onConfirm() {
    this.dialogRef.close(this.priorityTitle);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  isDeletable(): boolean {
    return this.operationType == OperationType.EDIT;
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: '500px',
        data: {
          dialogTitle: 'Confirm action',
          message: `Do you confirm deletion of "${this.priorityTitle}" priority?`
        },
        autoFocus: false
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }
}
