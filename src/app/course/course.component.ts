import {Component, OnInit} from '@angular/core';
import {Course} from "../course";
import {User} from "../user";
import {CoursesService} from "../core/courses.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {UserService} from "../core/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    public course: Course;
    public user: User;
    public isLogged = false;
    public userRole: string = '';
    public noCourseErrorMessage: string = '';

    constructor(public coursesService: CoursesService,
                public db: AngularFirestore,
                public userService: UserService,
                public router: Router,
                private route: ActivatedRoute) {
        this.route.params.subscribe((params) => {

            if (params.id) {
                this.coursesService.getCourse(params.id)
                    .subscribe(
                        actionArray => {
                            let course = {
                                uid: actionArray.payload.id,
                                ...actionArray.payload.data()
                            } as Course;
                            if (course.title === undefined) {
                                this.noCourseErrorMessage = 'Ooops, no course found.'
                            } else {
                                this.course = course;
                            }
                        }
                    );
            }
        });
    }

    ngOnInit() {
        this.getCurrentUser();
    }

    getCurrentUser() {
        return this.userService.getLoggedInUser()
            .subscribe(user => {
                if (user !== null) {
                    this.isLogged = true;
                    this.userService.getUser(user.uid).subscribe(
                        actionArray => {
                            // console.log(actionArray);
                            this.user = {
                                uid: actionArray.payload.id,
                                ...actionArray.payload.data()
                            } as User;
                            this.userRole = this.user.role;
                        })
                }
            });
    }

    rateCourse(rate) {
        this.coursesService.rateCourse(rate, this.course)
            .then(res => {
                // console.log(res);
            }, err => {
                // console.log(err);
            });
    }


}
