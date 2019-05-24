import {Injectable} from "@angular/core";
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {User} from "../user";

@Injectable()
export class UserService {
    user: User;

    constructor(
        public db: AngularFirestore,
        public afAuth: AngularFireAuth
    ) {
    }


    getCurrentUser() {
        return new Promise<any>((resolve, reject) => {
            var user = firebase.auth().onAuthStateChanged(function (user) {
                console.log(user);
                if (user) {
                    // console.log(user);
                    resolve(user);
                } else {
                    // console.log('no user logged');
                    reject('No user logged in');
                }
            })
        })
    }

    updateCurrentUser(value) {
        return new Promise<any>((resolve, reject) => {
            var user = firebase.auth().currentUser;
            console.log(user);
            user.updateProfile({
                displayName: value.name,
                photoURL: user.photoURL
            }).then(res => {
                console.log('success');
                resolve(res)
            }, err => reject(err))
        })
    }

    getUsers(){
        return this.db.collection('users').snapshotChanges();
    }

    getUser(uid){
        return this.db.collection('users').doc(uid).snapshotChanges();
    }

    changePermissions(isBlocked, uid) {
        return new Promise<any>((resolve, reject) => {
            this.db.collection("users").doc(uid).update({
                isBlocked: isBlocked,
            })
                .then(function () {
                    console.log("Success");
                })
                .catch(function (error) {
                    console.error("Error: ", error);
                });
        })
    }

    changeRole(role, uid) {
        let dbSelf = this.db;

        return new Promise<any>((resolve, reject) => {
            dbSelf.collection("users").doc(uid).update({
                role: role
            })
                .then(function () {
                    console.log("Success");
                })
                .catch(function (error) {
                    console.error("Error: ", error);
                });
        })
    }
}
