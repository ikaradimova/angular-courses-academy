import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesService} from "../core/courses.service";
import {empty} from "rxjs/internal/Observer";
import {User} from "../user";
import {Course} from "../course";

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
    addCourseForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(
        public courseService: CoursesService,
        public router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute

    ) {
        this.route.params.subscribe((params) => {
            console.log(params);

            if (params.id) {
                this.courseService.getCourse(params.id)
                    .subscribe(
                        actionArray => {
                            console.log(actionArray);
                            let course  = {
                                uid: actionArray.payload.id,
                                ...actionArray.payload.data()
                            } as Course;
                            console.log(course);
                            this.createForm();
                            this.addCourseForm.patchValue({...course});
                        }
                        // (course) => {
                    //     console.log({...course});
                    //     this.createForm();
                    //
                    //     this.addCourseForm.patchValue({...course});
                    //     // this.userForm.name = user.name;
                    //     // this.userForm.password = user.paswwrod;
                    // }
                );
            }
        });
        this.createForm();
    }

    createForm() {
        this.addCourseForm = this.fb.group({
            uid: [''],
            title: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    addCourse(value) {

        console.log(value);
        this.courseService.addCourse(value)
            .then(
                // function () {
                // console.log('then')
                res => {
                    this.errorMessage = "";
                    this.successMessage = "You added new course successfully.";
                    var routerSelf = this.router;
                    setTimeout(function () {
                        // var router: Router;
                        routerSelf.navigate(['/courses']);
                    }, 2000);

                    //   // document.location.href = '/courses';
                    //   // location.href = "/courses";
                    console.log(res);
                    // this.errorMessage = "";
                    // this.successMessage = "You added new course successfully.";
                    // window.location.href = '/courses';
                }, err => {
                    console.log(err);
                    this.errorMessage = err.message;
                    this.successMessage = "";
                });
    }

    ngOnInit() {
    }

}
