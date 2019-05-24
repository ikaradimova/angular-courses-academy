import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Course } from './course';

@Injectable()
export class CourseService {
    coursesCollection: AngularFirestoreCollection<Course>;
    courseDoc: AngularFirestoreDocument<Course>;

    constructor(private afs: AngularFirestore) {
        this.coursesCollection = this.afs.collection('courses', ref =>
            ref.orderBy('id', 'desc')
        )
    }

    getCourses() {
        // return this.coursesCollection.snapshotChanges().map(actions => {
        //     return actions.map(a => {
        //         const data = a.payload.doc.data() as Course;
        //         const id = a.payload.doc.id;
        //         return { id, ...data };
        //     })
        // })
    }

    getCourseData(id: string) {
        this.courseDoc = this.afs.doc<Course>(`courses/${id}`)
        return this.courseDoc.valueChanges()
    }

    getCourse(id: string) {
        return this.afs.doc<Course>(`courses/${id}`)
    }

    create(data: Course) {
        this.coursesCollection.add(data)
    }

    delete(id: string) {
        return this.getCourse(id).delete()
    }

    update(id: string, formData) {
        return this.getCourse(id).update(formData)
    }
}
