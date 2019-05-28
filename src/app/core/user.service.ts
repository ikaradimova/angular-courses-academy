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
                if (user) {
                    resolve(user);
                } else {
                    reject('No user logged in');
                }
            })
        })
    }

    getLoggedInUser() {
        return this.afAuth.authState;
    }


    updateCurrentUser(value) {
        return new Promise<any>((resolve, reject) => {
            var user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: value.name,
                photoURL: user.photoURL
            }).then(res => {
                resolve(res)
            }, err => reject(err))
        })
    }

    getUsers() {
        return this.db.collection('users').snapshotChanges();
    }

    getUser(uid) {
        return this.db.collection('users').doc(uid).snapshotChanges();
    }

    changePermissions(isBlocked, uid) {
        return new Promise<any>((resolve, reject) => {
            this.db.collection("users").doc(uid).update({
                isBlocked: isBlocked,
            })
                .then(function () {
                })
                .catch(function (error) {
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
                })
                .catch(function (error) {
                });
        })
    }

    joinCourse(userId, courseId) {
        return new Promise<any>((resolve, reject) => {
            this.db.collection('users').doc(userId).update({
                joinedCourses: firebase.firestore.FieldValue.arrayUnion(courseId),
            })
                .then(res => {
                    resolve();
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        })
    }
}
