import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent implements OnInit {

  @Input()
  iconName!: string;

  @Input()
  count: any;

  @Input()
  countTotal: any;

  @Input()
  title!: string;

  ngOnInit(): void {
  }

}
