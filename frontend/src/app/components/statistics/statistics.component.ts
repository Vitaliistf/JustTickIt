import {Component, Input, OnInit} from '@angular/core';
import {DashboardData} from "../../dialog/dashboard-data";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  @Input()
  dash!: DashboardData;

  @Input()
  showStat!: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  getTotal(): number {
    if (this.dash.uncompletedTotal != undefined && this.dash.completedTotal != undefined) {
      return this.dash.completedTotal + this.dash.uncompletedTotal;
    }
    return 1;
  }

  getCompletedCount() {
    if (this.dash) {
      return this.dash.completedTotal;
    }
    return 0;
  }

  getUncompletedCount() {
    if (this.dash) {
      return this.dash.uncompletedTotal;
    }
    return 0;
  }

  getCompletedPercent() {
    if (this.dash) {
      if(this.dash.completedTotal && this.dash.completedTotal > 0) {
        return this.dash.completedTotal / this.getTotal();
      }
    }
    return 0;
  }

  getUncompletedPercent() {
    if (this.dash) {
      if(this.dash.uncompletedTotal && this.dash.uncompletedTotal > 0) {
        return this.dash.uncompletedTotal / this.getTotal();
      }
    }
    return 0;
  }

}
