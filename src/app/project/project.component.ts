import { Component, Inject  } from '@angular/core';
import { IProject } from '../interfaces/project.interface';
import { ICircle } from '../interfaces/circle.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements IProject {

  user!:string;
  id!: string;
  name!: string;
  circles!: ICircle[];


constructor(@Inject(String) user:string,@Inject(String) id:string,@Inject(String) name:string,@Inject(String) circles: ICircle[] ) {
  this.user = user;
  this.id=id;
  this.name=name;
  this.circles = circles
}

}
