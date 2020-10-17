import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DDBBService {

  meses: Array<string>;
  constructor(private afs: AngularFirestore,
              private afstorage: AngularFireStorage) { 
    this.meses = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  }

  async GuardarStorage(archivo){
    // REFERENCIA
    var storageRef = firebase.storage().ref();
    // CREO /IMAGENES Y GUARDO REFERENCIA
    var imagesRef = storageRef.child('imagenes/');
    //CREO ARCHIVO DENTRO DE IMAGENES Y GUARDO REFERENCIA
    var spaceRef = imagesRef.child(Date.now().toString());
    // PATH COMPLETO
    var pathCompleto = spaceRef.fullPath;
    const response = await fetch(archivo);
    const blobImg = await response.blob();

    await spaceRef.put(blobImg).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
    let urlDescarga;
    await spaceRef.getDownloadURL().then(function(url) {
      urlDescarga = url;
    }).catch(function(error) {
      switch (error.code) {
        case 'storage/object-not-found':
          break;    
        case 'storage/unauthorized':
          break;    
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    }); 
    return urlDescarga;
  }

  async AgregarImagen(mailUsuario:string, imagen, colleccionDondeGuardar: string){
    let fechaActual = new Date();
    let dia = fechaActual.getDate();
    let url = await this.GuardarStorage(imagen);
    return await this.afs.collection(colleccionDondeGuardar).add({
      usuario: mailUsuario,
      foto: url,
      fecha: this.convertDate(fechaActual)+' '+ this.converHours(fechaActual),
      fechaParaComparar: fechaActual.getTime(),
      cantidadVotos: 0,
    });
  }

  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }
  converHours(inputFormat){
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getHours()), pad(d.getMinutes())].join(':')
  }

  public ObtenerDatos(coleccion:string) {
    return this.afs.collection(coleccion).snapshotChanges();
  }

  public ObtenerUnaImagen(documentId: string, coleccion) {
    // return this.afs.collection(coleccion).doc(documentId).snapshotChanges();
    return this.afs.collection(coleccion).doc(documentId);
  }

  VotarImagen(mailUsuario:string, idImagenVotada, coleccion:string){
    return this.afs.collection('votos-'+coleccion).add({
      usuario: mailUsuario,
      idImagenVotada: idImagenVotada
    });
  }

  ActualizarVotosDeFoto(idFotoVotada, coleccion: string, nuevosDatos){
    return this.afs.collection(coleccion).doc(idFotoVotada).update(nuevosDatos);
  }

  ObtenerImagenesVotadas(coleccion){
    return this.afs.collection('votos-'+coleccion).snapshotChanges();
  }

  private async ConvertirImgEnBase64(imagenConvertir: string) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(imagenConvertir);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;  
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
