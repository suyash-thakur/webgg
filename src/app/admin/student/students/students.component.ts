import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, OnDestroy {
  students: Student[];
  private studentSub: Subscription;
  filterUser(user: Student) {
    if ( user.year === '2020') {
      return false;
    } else {
      return user;
    }
  }
  filterUser2(user: Student) {
    if ( user.year === '2021') {
      return false;
    } else {
      return user;
    }
  }

  constructor( private router: Router, public dataService: DataService) { }

  ngOnInit() {
    this.dataService.getStudents();
    this.studentSub = this.dataService.getStudentUpdateListener().subscribe((student) => {
      console.log(student);

      this.students = student;
      console.log(this.students);
    });
  }
  addnew() {
    this.router.navigate(['edit']);
  }

  ngOnDestroy() {
    this.studentSub.unsubscribe();
  }

  onDelete(id: string) {
    console.log('del');
    this.dataService.deleteStudent(id);
  }

}
