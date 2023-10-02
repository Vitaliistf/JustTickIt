import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {DialogAction, DialogResult} from "../dialog-result";
import {Priority} from "../../models/priority";

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.css']
})
export class EditPriorityDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Priority, string],
    private dialog: MatDialog
  ) {
  }

  dialogTitle!: string;
  priority!: Priority;
  canDelete = false;

  ngOnInit() {
    this.priority = this.data[0];
    this.dialogTitle = this.data[1];

    if (this.priority && this.priority.id > 0) {
      this.canDelete = true;
    }
  }

  confirm(): void {
    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.priority));
  }

  cancel(): void {
    this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `Confirm deletion of priority: "${this.priority.title}"? (Tasks will be filled with no priority)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      if (result.action === DialogAction.OK) {
        this.dialogRef.close(new DialogResult(DialogAction.DELETE));
      }
    });
  }
}
