import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Course} from "../course";
import {AngularFireAuth} from "@angular/fire/auth";
import * as firebase from 'firebase/app';
import {Injectable} from "@angular/core";

@Injectable()
export class CoursesService {
    course$: Observable<Course>;

    constructor(public afAuth: AngularFireAuth, public db: AngularFirestore) {
    }

    addCourse(value) {
        console.log(value);
        return new Promise<any>((resolve, reject) => {
            this.db.collection('courses').add({
                title: value.title,
                description: value.description,
                rating: 0
            })
                .then( res => {
                    resolve();
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        })
    }

    getCourses(): Course[]{
        // return this.db.collection('/courses');
        let coursesCollection = [];
        this.db.collection("courses").get()
            .subscribe(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    coursesCollection.push(doc.data());
                });
            });
        return coursesCollection;
    }
}
