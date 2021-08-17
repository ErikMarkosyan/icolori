import { IProject } from "./project.interface";

export interface IUsers {
  name: string;
  // lastName: string;
  // phoneNumber: number;
  email: string;
  password: string;
  // confirmPassword: string;
  projects: IProject[];
}