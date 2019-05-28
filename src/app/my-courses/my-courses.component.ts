import {Component, OnInit} from '@angular/core';
import {Course} from "../course";
import {User} from "../user";
import {CoursesService} from "../core/courses.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {UserService} from "../core/user.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-my-courses',
    templateUrl: './my-courses.component.html',
    styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

    public courses: Course[];
    public user: User;
    public isLogged = false;
    public userRole: string = '';
    public joinedCourses: Course[];
    public joinedCoursesIds: any[];

    constructor(public coursesService: CoursesService,
                public db: AngularFirestore,
                public userService: UserService,
                public router: Router) {

    }

    ngOnInit() {
        this.getCurrentUser();
    }

    getCurrentUser() {
        // let user = new User();
        let coursesServiceSelf = this.coursesService;
        this.userService.getLoggedInUser()
            .subscribe(user => {
                if (user !== null) {
                    this.isLogged = true;
                    this.userService.getUser(user.uid).subscribe(
                        actionArray => {
                            this.user = {
                                uid: actionArray.payload.id,
                                ...actionArray.payload.data()
                            } as User;
                            this.userRole = this.user.role;
                            this.joinedCoursesIds = this.user.joinedCourses;
                            let joinedCourses = [];
                            if (this.joinedCoursesIds.length > 0) {
                                this.joinedCoursesIds.forEach(function (courseId) {
                                    coursesServiceSelf.getCourse(courseId)
                                        .subscribe(
                                            actionArray => {
                                                let course = {
                                                    uid: actionArray.payload.id,
                                                    ...actionArray.payload.data()
                                                } as Course;
                                                console.log(course);
                                                if(course.title !== undefined && course.description !== undefined){
                                                    joinedCourses.push(course);
                                                }
                                            }
                                        );
                                });
                                this.joinedCourses = joinedCourses;
                            }
                        })
                }
            });

    }

}
