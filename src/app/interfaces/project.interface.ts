import { ICircle } from './circle.interface';

export interface IProject {
  user: string;
  id: string;
  name: string;
  circles: ICircle[];
}
