import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nodelist',
  templateUrl: './nodelist.component.html',
  styleUrls: ['./nodelist.component.scss']
})

export class NodelistComponent implements OnInit {
  @Input() node:any

  constructor() { }

  ngOnInit(): void {
  }

}
