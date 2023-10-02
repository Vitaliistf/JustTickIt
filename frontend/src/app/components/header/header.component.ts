import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SettingsDialogComponent} from 'src/app/dialog/settings-dialog/settings-dialog.component';
import {Priority} from "../../models/priority";
import {DialogAction} from "../../dialog/dialog-result";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  categoryName!: string;

  @Input()
  showStatistics!: boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  @Output()
  toggleMenu = new EventEmitter();

  @Output()
  settingsChanged = new EventEmitter<Priority[]>();

  constructor(private dialog: MatDialog,) {
  }

  ngOnInit() {
  }

  showSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent,
        {
          autoFocus: false,
          width: '500px'
        });

    dialogRef.afterClosed().subscribe(result => {

      if (result && result.action === DialogAction.SETTINGS_CHANGE) {
        this.settingsChanged.emit(result.obj);
        return;
      }
    });
  }

  onToggleStat() {
    this.toggleStat.emit(!this.showStatistics);
  }

}
