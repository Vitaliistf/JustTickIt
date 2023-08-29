import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input()
  totalTasksInCategory!: number;

  @Input()
  completedTasksInCategory!: number;

  @Input()
  uncompletedTasksInCategory!: number;

}
