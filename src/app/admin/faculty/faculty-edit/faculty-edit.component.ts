import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/models/faculty';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-faculty-edit',
  templateUrl: './faculty-edit.component.html',
  styleUrls: ['./faculty-edit.component.css']
})
export class FacultyEditComponent implements OnInit {
  faculty: Faculty;
  private facultySub: Subscription;
  form: FormGroup;
  mode = 'create';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  facultyId: string;
  constructor(private route: ActivatedRoute, public dataService: DataService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      designation: new FormControl(null, {
        validators: [Validators.required]
      }),
  });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('facultyId')) {
      this.mode = 'edit';
      this.facultyId = paramMap.get('facultyId');
      this.dataService.getFaculty(this.facultyId).subscribe(facultyData => {
        this.faculty = {
          id: facultyData._id,
          name: facultyData.name,
          designation: facultyData.designation,
        };
        this.form.setValue({
          name: this.faculty.name,
          designation: this.faculty.designation,
        });
      });
} else {
  this.mode = 'create';
  this.facultyId = null;
}
});
}
onSaveFaculty() {
  if (this.form.invalid) {
    return;
  }
  if (this.mode === 'create') {
    this.dataService.addFaculty(this.form.value.name, this.form.value.designation);
  } else {
    this.dataService.updateFaculty(this.facultyId, this.form.value.name, this.form.value.designation);
  }
}
}
