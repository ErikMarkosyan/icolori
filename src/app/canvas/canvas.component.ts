import { Component, OnInit } from '@angular/core';
import { ICircle } from '../interfaces/circle.interface';
import { ECircleCount } from '../enums/circle-count.enum';
import { LocalStorageService } from '../services/storage.service';
import { IProject } from '../interfaces/project.interface';
import { CirclesComponent } from '../circles/circles.component';
import { ProjectComponent } from '../project/project.component';
import { CircleComponent } from '../circle/circle.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  circles: ICircle[] = [];
  projectName: string = '';
  projectList: IProject[] = [];
  projectListName = 'circlesProject';
  canvasSizes: number[] = [
    ECircleCount.MIN, // 100
    ECircleCount.MID, // 225
    ECircleCount.MAX, // 400
  ];
  selectedSize: number = this.canvasSizes[0];
  currentColor: string = '#000';
  currentUser!: string;
  id!: string;

  constructor(private storage: LocalStorageService, private router: Router) {}

  ngOnInit(): void {
    this.getProjects();
    console.log(this.projectList);
  }

  onGenerateCircles(): void {
    this.resetColors();
    console.log('this.circles: ', this.circles);
  }

  onSizeSelect(): void {
    this.circles = [];
  }

  onCircleClick(circle: ICircle): void {
    if (circle.color !== this.currentColor) {
      this.circles[circle.id].color = this.currentColor;
    } else {
      this.circles[circle.id].color = 'white';
    }
  }

  onResetColor(): void {
    if (!this.isEmpty(this.circles)) {
      this.resetColors();
    }
  }

  resetColors(): void {
    this.circles = [];
    for (let i = 0; i < this.selectedSize; i++) {
      const c = new CirclesComponent(i, this.newId(), '');
      this.circles.push(c);
    }
  }

  onFillCircles(): void {
    if (this.isEmpty(this.circles)) {
      return;
    }
    this.circles.forEach((item) => {
      item.color = this.currentColor;
    });
  }

  isEmpty(arr: ICircle[]): boolean {
    return !arr.length;
  }

  newId(): string {
    return String(Date.now());
  }

  setStorage() {
    const projectsStr = JSON.stringify(this.projectList);
    this.storage.set(this.projectListName, projectsStr);
  }

  onSave(): void {
    let indexKey;
    const project = new ProjectComponent(
      this.currentUser,
      this.newId(),
      this.projectName,
      this.circles
    );
    if (this.isEmpty(this.circles) || !this.projectName) {
      return;
    }
    this.projectList.push(project);
    this.projectName = '';
    const projectsStr = JSON.stringify(this.projectList);
    this.storage.set(this.projectListName, projectsStr);
    this.projectList.splice(indexKey || this.projectList.length, 0, project);
    this.setStorage();
    this.projectName = '';
    this.circles = [];
  }

  getProjects(): void {
    const currentUserStr = this.storage.get('loggedInUser');
    const projects = this.storage.get(this.projectListName);
    if (currentUserStr) {
      this.currentUser = currentUserStr;
    } else {
     
    }
    if (projects) {
      this.projectList = JSON.parse(projects);
    }
  }

  selectProject(project: IProject): void {
    this.circles = project.circles;
    this.projectName = project.name;
    
    this.id = project.id;
    if (project.circles.length === 100) {
      this.selectedSize = this.canvasSizes[0];
    } else if (project.circles.length === 225) {
      this.selectedSize = this.canvasSizes[1];
    } else {
      this.selectedSize = this.canvasSizes[2];
    }
  }
  removeSaved(project: IProject) {
    const storage = this.projectList.filter((item) => {
      return item.id !== project.id;
    });

    this.projectList = storage;
    const projectsStr = JSON.stringify(this.projectList);
    this.storage.set(this.projectListName, projectsStr);
  }
}
