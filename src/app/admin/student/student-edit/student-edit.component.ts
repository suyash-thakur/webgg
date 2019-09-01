import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})


export class StudentEditComponent implements OnInit {

  constructor(
    public route: ActivatedRoute, public dataService: DataService) { }
  student: Student;
  form: FormGroup;
  mode = 'create';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  studentId: string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: string[] = [

  ];

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      year: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('studentId')) {
        this.mode = 'edit';
        this.studentId = paramMap.get('studentId');
        this.dataService.getStudent(this.studentId).subscribe(studentData => {
          this.student = {
            id: studentData._id,
            name: studentData.name,
            year: studentData.passingYear,
            skills: studentData.skills
          };
          this.form.setValue({
            name: this.student.name,
            year: this.student.year

          });
          this.skills = this.student.skills;
        });
  } else {
    this.mode = 'create';
    this.studentId = null;
  }
});
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.skills.push( value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
  onSaveStudent() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.dataService.addStudent(this.form.value.name, this.form.value.year, this.skills);
    } else {
      this.dataService.updateStudent(this.student.id, this.form.value.name, this.form.value.year, this.skills);
    }
  }
}

