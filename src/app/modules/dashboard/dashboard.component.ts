import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of ,delay,repeat} from 'rxjs';

import { ClusterService } from 'src/app/cluster.service';
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts = Highcharts
  chartOptions;
  chartOptions2;
  chartOptions3;
  update = false;
  interval
  PatroniVersion: string = "";
  ClusterName: string = "";
  ClusterState: string = "";
  ClusterLag: number = 0;
  pause: boolean = false
  NumberOfReplicas: number = 0;
  panelOpenState:boolean=false;
  config;
  constructor(public service: ClusterService) { }
  res: any
  members: any

  ngOnDestroy(): void {



    this.data = []
    clearInterval(this.interval)
    this.update = true;
    this.interval = undefined;
  }
  ngOnInit(): void {
    this.GeneralInfo()
    this.CheckLag()
    this.service.loadCluster()
    this.members = this.service.nodes()

    this.loadConfig()
    this.loadRam()
    this.loadDisk()

    this.Chart1()
    this.Chart2()
    this.Chart3()

    
    if (this.interval == undefined) {
      this.interval = setInterval(() => {
        this.AddData()
        this.loadRam()
        this.update = true;
      }, 4000)
    }
  }
  test() {
    this.loadRam()
  }
  public loadConfig(){
    this.service.config.subscribe(res=>{
      this.config=res
      this.panelOpenState=true
    })
  }
  history=""
  public loadHistory(){
    this.service.history.subscribe(res=>{
     var temp=res.length
     this.history=res
     
    })
  }

  public GeneralInfo() {
    var lol
    this.service.patroni.subscribe(res => {
      var temp = JSON.stringify(res)
      var temp2 = JSON.parse(temp)
      console.log(temp2)
      this.ClusterName = temp2["patroni"]["scope"]
      this.PatroniVersion = temp2["patroni"]["version"]
      this.ClusterState = temp2["state"]
      if ("pause" in temp2) {
        this.pause = true
      }

    })


  }
  public CheckLag() {

    this.service.res.subscribe(res => {
      console.log(res)
      var members = res['members']
      var count=0
      members.forEach(element => {
        count++;
        if ("lag" in element) {
          this.ClusterLag += element.lag
        }

      });
      this.NumberOfReplicas=count-1
    }
    )
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

  data: any[] = [];

  public Chart1() {




    this.chartOptions = {
      chart: {
        type: 'spline',
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
        data: this.data,
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
        },
        max:100
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
        data: this.ram,
      }],
      
    }
  }
  ram=[]
  public Chart3() {




    this.chartOptions3 = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        //margin: [0, 0, 0, 0],
        //spacing: [0, 0, 0, 0]
  
      },
      title: {
        text: 'Disk<br>Usage',
        align: 'center',
        verticalAlign: 'middle',
        y: 100
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          size: '120%',
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '80%'],
          
        }
      },
      series: [{
        type: 'pie',
        name: 'Disk Share',
        innerSize: '40%',
        data: this.disk
      }]
    }
  }
  disk=[]
  public loadDisk(){
    this.service.disk.subscribe(res=> {
      var temp=res.split("a")
      this.disk.push(['Available',parseInt(temp[1])])
      this.disk.push(['Used',parseInt(temp[0])])
      
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





}
