import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  usuario: Usuario;
  constructor(private autenticacion: AngularFireAuth) { 
    this.usuario = new Usuario();
  }

  RegistrarUsuario(usuario: Usuario){
    return this.autenticacion.createUserWithEmailAndPassword(usuario.correo, usuario.clave);
  }

  LogearUsuario(usuario: Usuario){
    return this.autenticacion.signInWithEmailAndPassword(usuario.correo, usuario.clave);
  }

  Desloguear(){
    return this.autenticacion.signOut();
  }

  ObtenerUsuarioActual(){
    return this.autenticacion.currentUser;
  }
}
