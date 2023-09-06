import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Priority} from "../../models/priority";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {

  priorities!: Priority[];

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>) {
  }

  onClose() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    // this.dataService.getAllPriorities().subscribe(
    //   priorities => this.priorities = priorities
    // )
  }

  onAddPriority(priority: Priority) {
    // this.dataService.addPriority(priority).subscribe();
  }

  onDeletePriority(priority: Priority) {
    // this.dataService.deletePriority(priority.id).subscribe();
  }

  onUpdatePriority(priority: Priority) {
    // this.dataService.updatePriority(priority).subscribe();
  }
}
