import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {Course} from "../course";
import {CoursesService} from "../core/courses.service";
import {count} from "rxjs/operators";
// import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public courses: Course[];

  constructor(public coursesService: CoursesService, public db: AngularFirestore) {
    this.courses = coursesService.getCourses();
  }

  ngOnInit() {
  }
}
