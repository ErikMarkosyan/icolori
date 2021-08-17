import { Component, Inject } from '@angular/core';
import { ICircle } from '../interfaces/circle.interface';


@Component({
  selector: 'app-circles',
  templateUrl: './circles.component.html',
  styleUrls: ['./circles.component.css']
})
export class CirclesComponent implements ICircle {

  id!: number;
  uid!: string;
  color!: string;


    constructor(@Inject(String) id:number,@Inject(String) uid:string,@Inject(String) color: string) {
      this.id=id;
      this.uid=uid;
      this.color=color
  

  
}
}