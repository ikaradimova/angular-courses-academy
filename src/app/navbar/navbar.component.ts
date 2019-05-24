import { Component, OnInit } from '@angular/core'
import { AuthService } from '../core/auth.service'
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

    constructor(public auth: AuthService,
                public userService: UserService,
                public authService: AuthService,
                private location : Location,
                public router: Router,) {

    }

    ngOnInit() {
        this.getCurrentUser();
    }

    logout(){
        this.authService.doLogout()
            .then((res) => {
                this.router.navigate(['/courses']);
                // this.location.back();
            }, (error) => {
                console.log("Logout error", error);
            });
    }

    getCurrentUser(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            this.userService.getCurrentUser()
                .then(user => {
                    console.log(user);
                    this.isLogged = true;
                    let uid = user.uid;
                    this.userService.getUser(uid).subscribe(actionArray => {
                        console.log(actionArray);
                        this.loggedUser =  {
                                uid: actionArray.payload.id,
                                ...actionArray.payload.data()
                            } as User;
                        // let currentUser = this.userService.getUser(uid);
                        // console.log(currentUser);
                    });
                    console.log(this.loggedUser);
                    // this.router.navigate(['/user']);
                    return resolve(false);
                }, err => {
                    console.log(err);
                    return resolve(true);
                })
        })
    }
}
