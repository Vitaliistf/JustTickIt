import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Priority} from "../../models/priority";
import {DialogAction, DialogResult} from "../dialog-result";
import {PriorityServiceImpl} from "../../service/impl/priority.service";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  priorities!: Priority[];
  settingsChanged = false;

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>,
    private priorityService: PriorityServiceImpl
  ) {
  }


  ngOnInit() {
    this.priorityService.getAll().subscribe(priorities => this.priorities = priorities);
  }

  close(): void {
    if (this.settingsChanged) {
      this.dialogRef.close(new DialogResult(DialogAction.SETTINGS_CHANGE, this.priorities));
    } else {
      this.dialogRef.close(new DialogResult(DialogAction.CANCEL));
    }
  }

  addPriority(priority: Priority): void {

    this.settingsChanged = true;

    this.priorityService.create(priority).subscribe(result => {
      this.priorities.push(result);
    });
  }

  deletePriority(priority: Priority): void {

    this.settingsChanged = true;

    this.priorityService.delete(priority.id).subscribe(() => {
        this.priorities.splice(this.getPriorityIndex(priority), 1);
      }
    );
  }

  updatePriority(priority: Priority): void {

    this.settingsChanged = true;

    this.priorityService.update(priority.id, priority).subscribe(() => {
        this.priorities[this.getPriorityIndex(priority)] = priority;
      }
    );
  }

  getPriorityIndex(priority: Priority): number {
    const tmpPriority = this.priorities.find(t => t.id === priority.id);
    return this.priorities.indexOf(<Priority>tmpPriority);
  }
}
