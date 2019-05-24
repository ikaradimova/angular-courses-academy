import {Component, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../user";
import {UserService} from "../core/user.service";
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    public users: User[];

    ngOnInit() {
        this.getUsers();
    }

    constructor(db: AngularFirestore, private userService: UserService) {

    }

    changePermissions(isBlocked, uid) {
        this.userService.changePermissions(isBlocked, uid)
            .then(res => {
                console.log(res);
            }, err => {
                console.log(err);
            });
    }

    getUsers(){
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
                console.log(res);
            }, err => {
                console.log(err);
            });
    }
}
