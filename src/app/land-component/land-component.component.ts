import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-land-component',
  templateUrl: './land-component.component.html',
  styleUrls: ['./land-component.component.css']
})
export class LandComponentComponent {

pname: any;
addres: any;
map: any;
img: any;
img_arr:any=[];
data:any
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get(`${environment.backendUrl}projects/lands`).subscribe((data) => {
      this.data= data
    })
  }

  img_add() {
    this.img_arr.push(this.img)
  }

  submit() {
    let obj = {
      "project_name":this.pname,
      "address":this.addres,
      "map":this.map,
      "images":this.img_arr,
    }
      this.http.post(`${environment.backendUrl}projects/lands`,obj).subscribe((data) => {
        alert(data)
      })
  }

  
}