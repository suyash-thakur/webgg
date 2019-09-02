import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { Faculty } from 'src/app/models/faculty';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit, OnDestroy {

  faculties: Faculty[];
  private facultySub: Subscription;

  constructor(private router: Router, public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getFaculties();
    this.facultySub = this.dataService.getFacultyUpdateListener().subscribe((faculty) => {
      console.log(faculty);

      this.faculties = faculty;
      console.log(this.faculties);
    });
  }
  addnew() {
    this.router.navigate(['facultyEdit']);
  }

  ngOnDestroy() {
    this.facultySub.unsubscribe();
  }

  onDelete(id: string) {
    console.log('del');
    this.dataService.deleteFaculty(id);
  }

}
