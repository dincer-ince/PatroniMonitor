import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NodeComponent } from './modules/node/node.component';

const routes: Routes = [
  {
    path: '', component:DefaultComponent,
    children: [
      { path: '', component: DashboardComponent},
      { path: 'node/:id', component: NodeComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
