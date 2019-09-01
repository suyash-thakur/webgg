import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { StudentsComponent } from './admin/student/students/students.component';
import { StudentEditComponent } from './admin/student/student-edit/student-edit.component';
import { ProjectsComponent } from './admin/project/projects/projects.component';
import { ProjectEditComponent } from './admin/project/project-edit/project-edit.component';

const routes: Routes = [
  {path: '',  component: AdminComponent, children: [
    {path: '', component: StudentsComponent},
    {path: 'edit', component: StudentEditComponent},
    {path: 'edit/:studentId', component: StudentEditComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'projectEdit', component: ProjectEditComponent},
    {path: 'projectEdit/:projectId', component: ProjectEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
