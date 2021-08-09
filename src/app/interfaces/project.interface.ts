import {ICircle} from "./circle.interface";

export interface IProject {
  id: string;
  name: string;
  circleSize:number;
  circles: ICircle[];
}
