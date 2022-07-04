import { Component, OnInit } from '@angular/core';
import { ClusterService } from 'src/app/cluster.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public service: ClusterService) { }
  
  ngOnInit(): void {
  }

}
