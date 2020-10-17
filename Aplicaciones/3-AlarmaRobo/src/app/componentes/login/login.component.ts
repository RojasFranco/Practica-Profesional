import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  usuario: Usuario;

  constructor(private router: Router,
              private alertCtrl: AlertController,
              private auth: AutenticacionService,
              public loadingController: LoadingController)
  {
    this.usuario = new Usuario();
  }

  ngOnInit() {}

  async Login(){
    if(this.usuario.correo && this.usuario.clave){
      try{
        await this.auth.LoguearUsuario(this.usuario);
        this.LoadingBienvenida();
        this.router.navigate(["principal"]);
      }
      catch(error){
        switch (error.code) {
          case 'auth/invalid-email':
            this.alertError("Ingrese un correo valido");
            break;
          case 'auth/user-not-found':
            this.alertError("Este correo no esta registrado, registrese");
            break;
          case 'auth/wrong-password':
            this.alertError("La contraseña no es correcta");
            break;
          default:
            this.alertError("Error inesperado: "+error.message);
            break;
        }
      }
    }
    else{
      this.alertError("Complete los campos");
    }
  }
  
  Registrarme(){
    this.router.navigate(["registrar"]);
  }  

  async alertError(mensaje: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alertErroresLoguear',
      header: 'Error',
      message: mensaje,
      buttons: ['Listo'],
    });
    await alert.present();
  }

  CompletarAdmin(){
    this.usuario.correo = "admin@admin.com";
    this.usuario.clave = "111111";
  }

  CompletarTester(){
    this.usuario.correo = "tester@tester.com";
    this.usuario.clave = "555555";
  }

  CompletarInvitado(){
    this.usuario.correo = "invitado@invitado.com";
    this.usuario.clave = "222222";
  }

  CompletarAnonimo(){
    this.usuario.correo = "anonimo@anonimo.com";
    this.usuario.clave = "444444";
  }
  
  CompletarUsuario(){
    this.usuario.correo = "usuario@usuario.com";
    this.usuario.clave = "333333";
  }

  async LoadingBienvenida() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Ingresando...',
      spinner: "crescent",
      duration: 3000
    });
    await loading.present();
  }
}
