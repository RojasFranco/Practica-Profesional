import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CloudFirestoreService {

  constructor(private firestore: AngularFirestore) { }

  ObtenerTodosDatos(coleccion: string){
    return this.firestore.collection(coleccion).get();
  }

  ObtenerUnDato(coleccion: string, key: string){
    return this.firestore.collection(coleccion).doc(key).get();
  }

  AgregarDatoConId(coleccion: string, key: string, elementoGuardar){
    return this.firestore.collection(coleccion).doc(key).set(elementoGuardar);
  }

  AgregarDatoSinId(coleccion:string, elementoGuardar){
    return this.firestore.collection(coleccion).add(elementoGuardar);
  }

  ActualizarDatos(coleccion: string, key:string,campoNuevo){
    return this.firestore.collection(coleccion).doc(key).update(campoNuevo);
  }

  BorrarDato(coleccion: string, key: string){
    return this.firestore.collection(coleccion).doc(key).delete();
  }
}
