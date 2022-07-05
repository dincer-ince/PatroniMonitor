import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClusterService } from 'src/app/cluster.service';
import { delay, from, of, window } from 'rxjs';
import * as Highcharts from "highcharts";
import { HostListener } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit , OnDestroy {
  
  changed:boolean = false;
  



  nodenum: any;
  
  @Input() id: any
  member: any
  update:boolean=true;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions;
  chartOptions2;
  constructor(public service: ClusterService, route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.id = params['id'];
      this.service.nodes().subscribe(res => this.member = res[this.id])
      
      this.ngOnDestroy()
      this.ngOnInit()
    })
  }
  ngOnDestroy(): void{
    
    
    this.changed=false;
    
    this.update=true;
    this.data=[]
    clearInterval(this.interval)
    this.interval=undefined;

  }
  
  interval;
  
  ngOnInit(): void {
    this.changed=true;
    this.Chart1()
    this.Chart2()

    if(this.interval==undefined){
      this.interval=setInterval(() =>
      { 
        this.AddData()
        this.loadRam()
        this.update=true;
      },4000)
    }
    
     
    
  }
  
  

 
  public updatedata() {return of(this.update)};

  fullConfig=""
  public loadFullConfig(){
    this.service.fullconfig.subscribe(res=>{
      this.fullConfig=res;
    })
  }

  public AddData() {
    var date = new Date();
    this.service.generalInfoRes.subscribe(res => {

      if (this.data.length < 10) {
        this.data.push([`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, parseInt(res)])

        this.update = true;
      } else {
        this.data.shift()
        this.data.push([`${date.getMinutes()}:${date.getSeconds()}`, parseInt(res)])
        this.update = true;
      }
    })
  }
  public loadRam(){
    var date=new Date(); 
    this.service.ram.subscribe(res=> {
      console.log(res['Memory'])
      if(this.ram.length<10){
        this.ram.push([`${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`, 100-parseInt(res['Memory'])])
      }else{
        this.ram.shift()
        
        this.ram.push([`${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`, 100-parseInt(res['Memory'])])
      }
      
    })
  }
  ram:any[] = [];
  data: any[] = [];

  public Chart1() {
    
    
    
    
      this.chartOptions = {
        chart: {
          type: 'line',
        },
        title: {
          text: 'CPU Usage',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: null,
          }
        },
        xAxis: {
          type: 'category',
        },
        tooltip: {
          headerFormat: `<div>Date: {point.key}</div>`,
          pointFormat: `<div>{series.name}: {point.y}</div>`,
          shared: true,
          useHTML: true,
        },
        series: [{
          name: 'Usage',
          data:this.data,
        }],
      }
    }
    public Chart2() {
    
    
    
    
      this.chartOptions2 = {
        chart: {
          type: 'area',
        },
        title: {
          text: 'Ram Usage',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: null,
          }
        },
        xAxis: {
          type: 'category',
        },
        tooltip: {
          headerFormat: `<div>Date: {point.key}</div>`,
          pointFormat: `<div>{series.name}: {point.y}</div>`,
          shared: true,
          useHTML: true,
        },
        series: [{
          name: 'Usage',
          data:this.ram,
        }],
      }
    }
    
    
  


  // public Chart2() {
    
  //   let general=this.service.generalInfoRes;
    
  //   var changed=this.changed
    
    
    
  //   this.chartOptions2 = {
  //     chart: {
  //       type: 'line',
  //       events:{
  //         load: function(){
  //           var series=this.series[0];
  //           setInterval(function(){
              
  //             if(changed){
  //               general.subscribe(res => {
  //                 let date = new Date();
  //                 try{
  //                   if (series.data.length < 10) {
  //                     series.addPoint([`${date.getMinutes()}/${date.getSeconds()}`, parseInt(res)], true, false)
  //                   } else {
  //                     series.addPoint([`${date.getMinutes()}/${date.getSeconds()}`, parseInt(res)], true, true)
  //                 }}
  //                 catch{
  //                   
  //                 }
                  
                  
                  
  //                 //this.update=true;
  //               });
  //             }
  //           },1000)
  //         }
  //       }
  //     },
  //     title: {
  //       text: 'Line Chart',
  //     },
  //     credits: {
  //       enabled: false,
  //     },
  //     legend: {
  //       enabled: false,
  //     },
  //     yAxis: {
  //       title: {
  //         text: null,
  //       }
  //     },
  //     xAxis: {
  //       type: 'category',
  //     },
  //     tooltip: {
  //       headerFormat: `<div>Date: {point.key}</div>`,
  //       pointFormat: `<div>{series.name}: {point.y}</div>`,
  //       shared: true,
  //       useHTML: true,
  //     },
  //     series: [{
  //       name: 'Amount',
  //       data: [],
  //     }],
  //   };
    
  // }
}



