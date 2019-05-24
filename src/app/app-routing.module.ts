import {NgModule} from '@angular/core';
// import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {CoursesComponent} from './courses/courses.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import { AuthGuard } from './core/auth.guard';
import {UserResolver} from './user/user.resolver';
import {UsersComponent} from "./users/users.component";
import {AddCourseComponent} from "./add-course/add-course.component";

const routes: Routes = [
    {path: 'courses', component: CoursesComponent},
    {path: '', redirectTo: 'courses', pathMatch: 'full'},
    {path: 'login', component: LoginComponent/*, canActivate: [AuthGuard]*/},
    {path: 'register', component: RegisterComponent/*, canActivate: [AuthGuard]*/},
    {path: 'user', component: UserComponent, resolve: {data: UserResolver}},
    {path: 'users', component: UsersComponent},
    {path: 'add-course', component: AddCourseComponent}
];

@NgModule({
    // declarations: [],
    imports: [
        // CommonModule
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
