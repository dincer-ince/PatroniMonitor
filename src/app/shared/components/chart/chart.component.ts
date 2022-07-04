import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() Highcharts: typeof Highcharts = Highcharts;
  @Input() chartOptions: Highcharts.Options
  @Input() updateFlag: Observable<boolean>=of(true);
  update;
  lol=this.updateFlag.subscribe(res=> {
    this.update=res,console.log(this.update)
  });
  
}
              

