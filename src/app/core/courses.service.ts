import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {Injectable} from "@angular/core";

@Injectable()
export class CoursesService {

    constructor(public db: AngularFirestore) {

    }

    addCourse(value) {
        // console.log(value);
        if(value.uid){
            return new Promise<any>((resolve, reject) => {
                this.db.collection('courses').doc(value.uid).update({
                    title: value.title,
                    description: value.description
                })
                    .then( res => {
                        resolve();
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
            })
        } else {
            return new Promise<any>((resolve, reject) => {
                this.db.collection('courses').add({
                    title: value.title,
                    description: value.description,
                    rating: 0,
                    rate: 0,
                    numberOfRates: 0
                })
                    .then( res => {
                        resolve();
                    })
                    .catch(function(error) {
                        console.error("Error adding document: ", error);
                    });
            })
        }

    }

    getCourses(){
        return this.db.collection('courses').snapshotChanges();
    }

    deleteCourse(uid){
        return this.db.collection('courses').doc(uid).delete().then(function() {
            // console.log("Document successfully deleted!");
        }).catch(function(error) {
            // console.error("Error removing document: ", error);
        });
    }

    getCourse(uid){
        // console.log(uid);
        return this.db.collection('courses').doc(uid).snapshotChanges();
    }

    rateCourse(rate, course){
        let newRate = course.rate + rate;
        let newNumberOfRates = course.numberOfRates + 1;
        let newRating = newRate / newNumberOfRates;
        return new Promise<any>((resolve, reject) => {
            this.db.collection("courses").doc(course.uid).update({
                rate: newRate,
                numberOfRates: newNumberOfRates,
                rating: newRating
            })
                .then(function () {
                    // console.log("Success");
                })
                .catch(function (error) {
                    // console.error("Error: ", error);
                });
        })
    }
}
