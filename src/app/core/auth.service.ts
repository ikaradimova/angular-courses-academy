import {Injectable} from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from "rxjs/internal/Observable";
import {FirebaseUserModel} from './user.model';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable()
export class AuthService {

    user$: Observable<FirebaseUserModel>;

    constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    }

    doGoogleLogin() {
        return new Promise<any>((resolve, reject) => {
            let provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res);
                }, err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    doRegister(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(this.addAdditionalInfoWhenRegister(value.username));
                }, err => reject(err))
        })
    }

    addAdditionalInfoWhenRegister(username){
        console.log(firebase.auth().currentUser.uid);
        this.db.collection("users").doc(firebase.auth().currentUser.uid).set({
            username: username,
            role: "user",
            isBlocked: false,
            email: firebase.auth().currentUser.email
        })
            .then(function() {
                console.log("Success");
            })
            .catch(function(error) {
                console.error("Error: ", error);
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
