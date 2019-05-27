import {Component, OnInit} from '@angular/core'
import {AuthService} from '../core/auth.service'
import {UsersService} from "../users.service";
import {UserService} from "../core/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {User} from "../user";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    // styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLogged = false;
    loggedUser = null;
    user: User;
    userRole: string = '';

    constructor(public auth: AuthService,
                public userService: UserService,
                public authService: AuthService,
                private location: Location,
                public router: Router,) {

    }

    ngOnInit() {
        this.getCurrentUser();
        // console.log(this.isLogged);
        // this.userService.getLoggedInUser()
        //     .subscribe(user => {
        //         if (user !== null) {
        //             this.isLogged = true;
        //             this.userService.getUser(user.uid).subscribe(
        //                 actionArray => {
        //                     console.log(actionArray);
        //                     this.user = {...actionArray.payload.data()} as User;
        //                     this.userRole = this.user.role;
        //                 })
        //         }
        //     });
    }

    logout() {
        this.authService.doLogout()
            .then((res) => {
                this.isLogged = false;
                this.router.navigate(['/courses']);
                // this.location.back();
            }, (error) => {
                console.log("Logout error", error);
            });
    }

    getCurrentUser()/*: Promise<boolean>*/ {
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
}
