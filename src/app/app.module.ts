import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {CoursesComponent} from './courses/courses.component';
import {CourseComponent} from './course/course.component';
import {CoursesService} from './core/courses.service';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './core/auth.guard';
import {AuthService} from './core/auth.service';
import {AngularFireAuth} from '@angular/fire/auth/auth';
import {UserResolver} from './user/user.resolver';
import {UserService} from './core/user.service';
import {UsersComponent} from './users/users.component';
import {AddCourseComponent} from './add-course/add-course.component';
import {NavbarComponent} from "./navbar/navbar.component";

@NgModule({
    declarations: [
        AppComponent,
        CoursesComponent,
        CourseComponent,
        LoginComponent,
        RegisterComponent,
        UserComponent,
        UsersComponent,
        AddCourseComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
        CoursesService,
        AuthGuard,
        AuthService,
        AngularFireAuth,
        UserResolver,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
