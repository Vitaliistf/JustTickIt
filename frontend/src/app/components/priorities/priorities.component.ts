import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from "../../models/priority";
import {MatDialog} from "@angular/material/dialog";
import {
  EditPriorityDialogComponent
} from "../../dialog/edit-priority-dialog/edit-priority-dialog.component";
import {OperationType} from "../../dialog/operation-type";
import {
  EditCategoryDialogComponent
} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.css']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fff';

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

  onAddPriority() {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent,
      {
        data: ['', 'Add priority', OperationType.ADD]
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newPriority = new Priority(0, result as string, PrioritiesComponent.defaultColor);
        this.addPriority.emit(newPriority);
      }
    });
  }

  onEditPriority(priority: Priority) {
    const dialogRef = this.dialog.open(EditPriorityDialogComponent,
      {
        data: [priority.title, 'Edit priority', OperationType.EDIT],
        width: '400px'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deletePriority.emit(priority);
        return;
      }

      if (result) {
        priority.title = result as string;
        this.updatePriority.emit(priority);
        return;
      }
    });
  }

  delete(priority: Priority) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: '500px',
        data: {
          dialogTitle: 'Confirm action',
          message: `Do you confirm deletion of "${priority.title}" priority?`
        },
        autoFocus: false
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePriority.emit(priority);
      }
    });
  }

  ngOnInit(): void {
  }

}
