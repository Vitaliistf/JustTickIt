import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from "../../models/priority";
import {MatDialog} from "@angular/material/dialog";
import {
  EditPriorityDialogComponent
} from "../../dialog/edit-priority-dialog/edit-priority-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {DialogAction} from "../../dialog/dialog-result";

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fcfcfc';

  @Input()
  priorities!: Priority[];

  @Output()
  deletePriority = new EventEmitter<Priority>();

  @Output()
  updatePriority = new EventEmitter<Priority>();

  @Output()
  addPriority = new EventEmitter<Priority>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openAddDialog() {

    const dialogRef = this.dialog.open(EditPriorityDialogComponent,
      {
        data:
          [new Priority(0, '', PrioritiesComponent.defaultColor),
            'Add priority'], width: '400px'
      });

    dialogRef.afterClosed().subscribe(result => {

      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        const newPriority = result.obj as Priority;
        this.addPriority.emit(newPriority);
      }
    });


  }

  openEditDialog(priority: Priority) {

    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {
      data: [new Priority(priority.id, priority.title, priority.color), 'Edit priority']
    });

    dialogRef.afterClosed().subscribe(result => {


      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.DELETE) {
        this.deletePriority.emit(priority);
        return;
      }

      if (result.action === DialogAction.SAVE) {
        priority = result.obj as Priority;
        this.updatePriority.emit(priority);
        return;
      }
    });


  }

  openDeleteDialog(priority: Priority) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm action',
        message: `Confirm deletion of priority: "${priority.title}"? (Tasks will be filled with no priority.)`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      if (result.action === DialogAction.OK) {
        this.deletePriority.emit(priority);
      }
    });
  }
}
