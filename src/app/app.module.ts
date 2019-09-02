import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { MatToolbarModule, MatButtonModule,
  MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
  MatTabsModule, MatInputModule, MatProgressSpinnerModule,  MatExpansionModule, MatChipsModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { HeaderComponent } from './admin/header/header.component';
import { StudentsComponent } from './admin/student/students/students.component';
import { StudentEditComponent } from './admin/student/student-edit/student-edit.component';
import { AdminComponent } from './admin/admin.component';
import { YearPipe } from './pipes/year.pipe';
import { ProjectsComponent } from './admin/project/projects/projects.component';
import { ProjectEditComponent } from './admin/project/project-edit/project-edit.component';
import { AlumniComponent } from './admin/alumni/alumni/alumni.component';
import { AlumniEditComponent } from './admin/alumni/alumni-edit/alumni-edit.component';
import { FacultyComponent } from './admin/faculty/faculty/faculty.component';
import { FacultyEditComponent } from './admin/faculty/faculty-edit/faculty-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    StudentsComponent,
    StudentEditComponent,
    AdminComponent,
    YearPipe,
    ProjectsComponent,
    ProjectEditComponent,
    AlumniComponent,
    AlumniEditComponent,
    FacultyComponent,
    FacultyEditComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatRadioModule,
    MatExpansionModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [MatExpansionModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
