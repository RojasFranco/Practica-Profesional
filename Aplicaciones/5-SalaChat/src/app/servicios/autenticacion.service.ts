import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  usuario: Usuario;
  constructor(private auth: AngularFireAuth) { 
    this.usuario = new Usuario();
  }

  RegistrarUsuario(usuario: Usuario){
    return this.auth.createUserWithEmailAndPassword(usuario.correo, usuario.clave);
  }

  LoguearUsuario(usuario: Usuario){
    return this.auth.signInWithEmailAndPassword(usuario.correo, usuario.clave);
  }
  
  DesloguearUsuario(){
    return this.auth.signOut();
  }

  ObtenerUsuarioActual(){
    return this.auth.currentUser;
  }

}
