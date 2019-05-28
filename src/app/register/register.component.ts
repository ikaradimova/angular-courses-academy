import {Component} from '@angular/core';
import {AuthService} from '../core/auth.service'
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(
        public authService: AuthService,
        public router: Router,
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    createForm() {
        this.registerForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            username: ['', Validators.required]
        });
    }

    tryRegister(value) {
        this.authService.doRegister(value)
            .then(res => {
                this.errorMessage = "";
                this.successMessage = "Your account has been created";
                this.router.navigate(['/courses']);
                // location.reload();
            }, err => {
                this.errorMessage = err.message;
                this.successMessage = "";
            })
    }

}
