import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { Projects } from '../models/projects';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  Student: Student[];
  Projects: Projects[];
}
