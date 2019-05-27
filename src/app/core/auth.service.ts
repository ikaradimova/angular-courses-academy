import {Injectable} from "@angular/core";
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable()
export class AuthService {

    constructor(public afAuth: AngularFireAuth,
                public db: AngularFirestore) {
    }


    doRegister(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(this.addAdditionalInfoWhenRegister(value.username));
                }, err => reject(err))
        })
    }

    addAdditionalInfoWhenRegister(username) {
        // console.log(firebase.auth().currentUser.uid);
        this.db.collection("users").doc(firebase.auth().currentUser.uid).set({
            username: username,
            role: "user",
            isBlocked: false,
            email: firebase.auth().currentUser.email,
            joinedCourses: []
        })
            .then(function () {
                // console.log("Success");
            })
            .catch(function (error) {
                // console.error("Error: ", error);
            });
    }

    doLogin(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err))
        })
    }

    doLogout() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                this.afAuth.auth.signOut()
                resolve();
            } else {
                reject();
            }
        });
    }


}
