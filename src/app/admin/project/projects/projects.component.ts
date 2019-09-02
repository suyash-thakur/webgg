import { Component, OnInit, OnDestroy } from '@angular/core';
import { Projects } from 'src/app/models/projects';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projects: Projects[];
  private projectSub: Subscription;
  contributer: string[] = [ ];
  constructor(private router: Router, public dataService: DataService) { }
  filterUser( project: Projects) {
    if ( project.type === '3D Model') {
      return project;
    } else {
      return false;
    }
  }
  filterUser2( project: Projects) {
    if ( project.type === 'AR/VR') {
      return project;
    } else {
      return false;
    }
  }

  filterUser3( project: Projects) {
    if ( project.type === 'Games') {
      return project;
    } else {
      return false;
    }
  }

  filterUser4( project: Projects) {
    if ( project.type === 'UI Design') {
      return project;
    } else {
      return false;
    }
  }
  ngOnInit() {
    this.dataService.getProjects();
    this.projectSub = this.dataService.getProjectUpdateListener().subscribe((projects) => {
      console.log(projects);
      this.projects = projects;
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }
  addNew() {
    this.router.navigate(['projectEdit']);
  }
  onDelete(id: string) {
    console.log('del');
    this.dataService.deleteProject(id);
  }
}
