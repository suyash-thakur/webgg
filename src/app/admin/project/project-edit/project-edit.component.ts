import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';
import { Projects } from 'src/app/models/projects';




@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  constructor(public route: ActivatedRoute, public dataService: DataService, public storage: StorageService) { }
  student: Student;
  project: Projects;
  form: FormGroup;
  mode = 'create';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  projectId: string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  contributers: string[] = [

  ];

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      discription: new FormControl(null, {
        validators: [Validators.required]
      }),
      link: new FormControl(null, {
        validators: [Validators.required]
      }),
      type: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.mode = 'edit';
        this.projectId = paramMap.get('projectId');
        this.dataService.getProject(this.projectId).subscribe(projectData => {
          this.project = {
            id: projectData._id,
            title: projectData.title,
            discription: projectData.discription,
            contributers: projectData.contributers,
            type: projectData.type,
            link: projectData.link
          };
          this.form.setValue({
            title: this.project.title,
            discription: this.project.discription,
            type: this.project.type,
            link: this.project.link,

          });
          this.contributers = this.project.contributers;
        });
  } else {
    this.mode = 'create';
    this.projectId = null;
  }
});
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.contributers.push( value.trim());
    }

    if (input) {
      input.value = '';
    }
  }
  remove(contributer: string): void {
    const index = this.contributers.indexOf(contributer);

    if (index >= 0) {
      this.contributers.splice(index, 1);
    }
  }
  onSaveProject() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.dataService.addProjects(this.form.value.title, this.form.value.discription, this.contributers,
        this.form.value.type, this.form.value.link);
    } else {
      this.dataService.updateProject(this.projectId, this.form.value.title, this.form.value.discription,
         this.contributers, this.form.value.type, this.form.value.link);
    }
  }
}
