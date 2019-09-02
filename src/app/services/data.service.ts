import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Projects } from '../models/projects';
import { Faculty } from '../models/faculty';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private students: Student[] = [];
  private studentUpdated = new Subject<Student[]>();

  private projects: Projects[] = [];
  private projectsUpdated = new Subject<Projects[]>();

  private faculty: Faculty[] = [];
  private facultyUpdated = new Subject<Faculty[]>();


  constructor(private http: HttpClient, private router: Router, private storage: StorageService) { }


getStudents() {
  this.http
    .get<{ message: string; students: any }>(
      'http://localhost:3000/student'
    )
    .pipe(map((studentData) => {
      console.log(studentData.students);
      return studentData.students.map(student => {
        return {
          name: student.name,
          year: student.passingYear,
          id: student._id,
          skills: student.skills
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.students = transformedPosts;
      this.storage.Student = this.students;
      this.studentUpdated.next([...this.students]);
    });
}
getStudentUpdateListener() {
  return this.studentUpdated.asObservable();
}

getStudent(id: string) {
  return this.http.get<{
    _id: string;
    name: string;
    passingYear: string;
    skills: string[];
  }>('http://localhost:3000/student/' + id);
}

addStudent(name: string, year: string, skills: string[]) {
  const studentData = {name, year, skills};
  console.log(studentData);
  this.http.post<{ message: string; student: Student}>('http://localhost:3000/student/add', studentData).subscribe(response => {
    console.log(response);
    this.router.navigate(['/']);
  });
}

updateStudent(id: string, name: string, year: string, skills: string[]) {
  const studentData: Student = {
    id: id,
    name: name,
    year:  year,
    skills: skills
  };
  this.http.put('http://localhost:3000/student/' + id, studentData).subscribe(response => {
    console.log(response);
    this.router.navigate(['/']);
  });
}
deleteStudent(studentId: string) {
  return this.http
    .delete('http://localhost:3000/student/' + studentId);
}

getProjects() {
  this.http
    .get<{ message: string; projects: any }>(
      'http://localhost:3000/projects'
    )
    .pipe(map((projectData) => {
      console.log(projectData);
      return projectData.projects.map(project => {
        return {
          contributers: project.contributers,
          discription: project.discription,
          link: project.link,
          title: project.title,
          type: project.type,
          id: project._id
        };
      });
    }))
    .subscribe(transformedProjects => {
      this.projects = transformedProjects;
      this.storage.Projects = this.projects;
      this.projectsUpdated.next([...this.projects]);
    });
}
getProjectUpdateListener() {
  return this.projectsUpdated.asObservable();
}

getProject(id: string) {
  return this.http.get<{
    _id: string;
    title: string;
    discription: string;
    contributers: string[];
    type: string;
    link: string;
  }>('http://localhost:3000/projects/' + id);
}

addProjects(title: string, discription: string, contributers: string[], type: string, link: string) {
  const projectData = {title, discription, contributers, type, link};
  console.log(projectData);
  this.http.post<{ message: string; student: Student}>('http://localhost:3000/projects/add', projectData).subscribe(response => {
    console.log(response);
    this.router.navigate(['/']);
  });
}

updateProject(id: string, title: string, discription: string, contributers: string[], type: string, link: string) {
  const projectData: Projects = {
    id: id,
    title: title,
    discription: discription,
    contributers: contributers,
    type: type,
    link: link
  };
  console.log(projectData);
  this.http.put('http://localhost:3000/projects/' + id, projectData).subscribe(response => {
    console.log(response);
    this.router.navigate(['/']);
  });
}

deleteProject(projectId: string) {
  return this.http
    .delete('http://localhost:3000/projects/' + projectId);
}

getFaculties() {
  this.http
    .get<{ message: string; faculty: any }>(
      'http://localhost:3000/faculty'
    )
    .pipe(map((facultyData) => {
      console.log(facultyData.faculty);
      return facultyData.faculty.map(faculty => {
        return {
          name: faculty.name,
          designation: faculty.designation,
          id: faculty._id
        };
      });
    }))
    .subscribe(transformedFaculty => {
      this.faculty = transformedFaculty;
      this.facultyUpdated.next([...this.faculty]);
    });
}
getFacultyUpdateListener() {
  return this.facultyUpdated.asObservable();
}

getFaculty(id: string) {
  return this.http.get<{
    _id: string;
    name: string;
    designation: string;
  }>('http://localhost:3000/faculty/' + id);
}

addFaculty(name: string, designation: string) {
  const facultyData = {name, designation,};
  console.log(facultyData);
  this.http.post<{ message: string; faculty: Faculty}>('http://localhost:3000/faculty/add', facultyData).subscribe(response => {
    console.log(response);
    this.router.navigate(['/']);
  });
}

updateFaculty(id: string, name: string, designation: string) {
  const facultyData: Faculty = {
    id: id,
    name: name,
    designation: designation
  };
  this.http.put('http://localhost:3000/faculty/' + id, facultyData).subscribe(response => {
    console.log(response);
    this.router.navigate(['/']);
  });
}

deleteFaculty(facultyId: string) {
  return this.http
    .delete('http://localhost:3000/faculty/' + facultyId);
}


}
