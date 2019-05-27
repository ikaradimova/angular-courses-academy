import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CoursesComponent} from './courses/courses.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UsersComponent} from "./users/users.component";
import {AddCourseComponent} from "./add-course/add-course.component";
import {MyCoursesComponent} from "./my-courses/my-courses.component";
import {CourseComponent} from "./course/course.component";
import {AuthGuard} from "./core/auth.guard";

const routes: Routes = [
    {path: 'courses', component: CoursesComponent},
    {path: '', redirectTo: 'courses', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    {path: 'users', component: UsersComponent},
    {path: 'add-course', component: AddCourseComponent},
    {path: 'add-course/:id', component: AddCourseComponent},
    {path: 'my-courses', component: MyCoursesComponent},
    {path: 'course/:id', component: CourseComponent}

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
