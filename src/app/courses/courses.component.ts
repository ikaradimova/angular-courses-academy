import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {Course} from "../course";
import {CoursesService} from "../core/courses.service";
import {count} from "rxjs/operators";
import {User} from "../user";
import {UserService} from "../core/user.service";
import {Route, Router} from "@angular/router";

// import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
    public courses: Course[];
    user: User;
    isLogged = false;
    userRole: string = '';

    constructor(public coursesService: CoursesService,
                public db: AngularFirestore,
                public userService: UserService,
                public router: Router) {
        // this.courses = coursesService.getCourses();
        this.getCourses();
        console.log(this.courses);
    }

    ngOnInit() {
        this.getCurrentUser();
    }

    getCourses() {
        this.coursesService.getCourses().subscribe(actionArray => {
            this.courses = actionArray.map(item => {
                return {
                    uid: item.payload.doc.id,
                    ...item.payload.doc.data()
                } as Course;
            })
        });
    }

    getCurrentUser() {
        this.userService.getLoggedInUser()
            .subscribe(user => {
                if (user !== null) {
                    this.isLogged = true;
                    this.userService.getUser(user.uid).subscribe(
                        actionArray => {
                            console.log(actionArray);
                            this.user = {...actionArray.payload.data()} as User;
                            this.userRole = this.user.role;
                        })
                }
            });
    }

    deleteCourse(uid) {
        this.coursesService.deleteCourse(uid);
    }

    editCourse(uid) {
        // this.router.navigate(['courses/add', uid]);
        this.router.navigate(['add-course/', uid]);
        // this.router.navigate(['add-course/', uid]);
    }
}
