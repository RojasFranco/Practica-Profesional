import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebaseCloud: AngularFirestore) { }

  ObtenerTodos(colecccion: string){
    return this.firebaseCloud.collection(colecccion).snapshotChanges();
  }

  AgregarDatoConId(coleccion: string, key:string, datoAgregar){
    return this.firebaseCloud.collection(coleccion).doc(key).set(datoAgregar);
  }

  AgregarDatoSinnId(coleccion: string, datoAgregar){
    return this.firebaseCloud.collection(coleccion).add(datoAgregar);
  }
  
}
