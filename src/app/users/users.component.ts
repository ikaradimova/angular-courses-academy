import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../user";
import {UserService} from "../core/user.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public users: User[];
    public user: User;
    public isLogged = false;
    public userRole: string = '';

    ngOnInit() {
        this.getUsers();
        this.getCurrentUser();
    }

    constructor(db: AngularFirestore, private userService: UserService) {

    }

    changePermissions(isBlocked, uid) {
        this.userService.changePermissions(isBlocked, uid)
            .then(res => {
            }, err => {
            });
    }

    getUsers() {
        this.userService.getUsers().subscribe(actionArray => {
            this.users = actionArray.map(item => {
                return {
                    uid: item.payload.doc.id,
                    ...item.payload.doc.data()
                } as User;
            })
        });
    }

    changeRole(role, uid) {
        this.userService.changeRole(role, uid)
            .then(res => {
                this.getUsers();
            }, err => {
            });
    }

    getCurrentUser() {
        return this.userService.getLoggedInUser()
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
