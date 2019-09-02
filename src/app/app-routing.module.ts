import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { StudentsComponent } from './admin/student/students/students.component';
import { StudentEditComponent } from './admin/student/student-edit/student-edit.component';
import { ProjectsComponent } from './admin/project/projects/projects.component';
import { ProjectEditComponent } from './admin/project/project-edit/project-edit.component';
import { FacultyComponent } from './admin/faculty/faculty/faculty.component';
import { FacultyEditComponent } from './admin/faculty/faculty-edit/faculty-edit.component';

const routes: Routes = [
  {path: '',  component: AdminComponent, children: [
    {path: '', component: StudentsComponent},
    {path: 'edit', component: StudentEditComponent},
    {path: 'edit/:studentId', component: StudentEditComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'projectEdit', component: ProjectEditComponent},
    {path: 'projectEdit/:projectId', component: ProjectEditComponent},
    {path: 'faculty', component: FacultyComponent},
    {path: 'facultyEdit', component: FacultyEditComponent},
    {path: 'facultyEdit/:facultyId', component: FacultyEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
