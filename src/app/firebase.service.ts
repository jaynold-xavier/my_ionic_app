import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  obj: AngularFireList<any>;
  
  constructor(private db: AngularFireDatabase) { 
    this.obj = db.list('/');
  }

  getSingleObject(id){
    return this.db.object(`/${id}`);
  }

  checkIfUserExists(uid):number {
    console.log('checkIfUserExists');
    var resualt = this.db.object(`/${uid}`);
    resualt.snapshotChanges().subscribe(data => {
      if (data.key === null) {
        alert(false)
        return 2
      } else {
        alert(true)
        return 1
      }
    })
    return 3
  }

  getData(){
    return this.obj.snapshotChanges();
  }

  pushData(data){
    return this.obj.push(data)
  }

  updateRecord(key:string, data){
    return this.obj.update(key, data);
  }

  deleteRecord(key:string){
    return this.obj.remove(key);
  }
}
