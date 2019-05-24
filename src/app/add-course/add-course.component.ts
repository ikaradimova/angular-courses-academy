import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CoursesService} from "../core/courses.service";
import {empty} from "rxjs/internal/Observer";

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
    ) {
        this.createForm();
    }

    createForm() {
        this.addCourseForm = this.fb.group({
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
