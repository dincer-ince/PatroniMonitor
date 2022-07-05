import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule} from '@angular/material/sidenav';
import { NodelistComponent } from 'src/app/modules/dashboard//nodelist/nodelist.component';
import { MatCardModule}from '@angular/material/card'
import { MatGridListModule } from "@angular/material/grid-list";
import {MatIconModule} from '@angular/material/icon';
import { NodeComponent } from 'src/app/modules/node/node.component';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from "@angular/material/divider";
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartComponent } from 'src/app/shared/components/chart/chart.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatExpansionModule }  from "@angular/material/expansion";
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatButtonModule  } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    NodelistComponent,
    NodeComponent,
    ChartComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    HighchartsChartModule,
    MatDividerModule,
    FlexLayoutModule,
    MatExpansionModule,
    NgxJsonViewerModule,
    MatButtonModule,
    MatProgressSpinnerModule,

    
  ]
})
export class DefaultModule { }
