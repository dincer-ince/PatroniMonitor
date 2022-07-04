import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map,of,retryWhen,delay,repeat } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  constructor(private http:HttpClient) { }
  ClusterConnection:boolean = true;
  firstTime:boolean = true;
  response:any;
  list:any;
  infoRes:any;
  selectedNode:number = 0;
  headers = new HttpHeaders().set('Access-Control-Allow-Origin',"*");
  
  clusters=[{name:"patroni_setup",host:"http://localhost:3002"},{name:"patroni_test",host:"http://localhost:3002"}]


  generalInfoRes=this.http.get("http://localhost:3002/cpu",{responseType:'text',headers:this.headers});

  patroni=this.http.get("http://localhost:3002/patroni",{responseType:'json',headers:this.headers});

    public GetPatroni(){
      return this.patroni.subscribe(res=>{
        var temp = JSON.stringify(res)
        return temp
      })
  }
  public getClusterConnection(){
    return of(this.ClusterConnection)
  }

  public loadInfo(){
    return this.generalInfoRes.subscribe(res => {
      console.log(res)
      return res;
    });
  }
  public getNodeNum(){
    of(this.selectedNode)
  }
  config= this.http.get("http://localhost:3002/config",{responseType:'json',headers:this.headers});

  ram=this.http.get("http://localhost:3002/ram",{responseType:'json',headers:this.headers});

  disk=this.http.get("http://localhost:3002/disk",{responseType:'text',headers:this.headers});

  res=  this.http.get("http://localhost:3002/cluster",{responseType:'json',headers:this.headers});
  public loadCluster(){
    this.res.pipe(
      retryWhen(
        error => {this.ClusterConnection=false; return error.pipe(
          delay(10000),
          
        )}

      ),delay(5000),repeat()
      ).subscribe(res => {
      this.response =JSON.stringify(res),
      this.response=JSON.parse(this.response),
      this.list=this.response['members'],
      this.ClusterConnection=true,
      console.log("update")
      this.firstTime=false
      },err => this.ClusterConnection=false);
    
    
    
  }
  
  
  public nodes(){
    return of(this.list)
  }
  




}
