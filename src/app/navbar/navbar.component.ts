import {Component, OnInit} from '@angular/core'
import {AuthService} from '../core/auth.service'
import {UserService} from "../core/user.service";
import {Router} from "@angular/router";
import {User} from "../user";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
    isLogged = false;
    user: User;
    userRole: string = '';

    constructor(public auth: AuthService,
                public userService: UserService,
                public authService: AuthService,
                public router: Router) {

    }

    ngOnInit() {
        this.getCurrentUser();
    }

    logout() {
        this.authService.doLogout()
            .then((res) => {
                this.router.navigate(['/login']);
                this.isLogged = false;
            }, (error) => {
            });
    }

    getCurrentUser() {
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
                        })
                }
            });
    }
}
