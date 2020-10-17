import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  sexo: string;
  perfil: string;
  perfiles: Array<string>;
  sexos: Array<string>;

  constructor(private router: Router, 
              private alertCtrl: AlertController,
              private auth: AutenticacionService,
              public toastController: ToastController) { 
    this.usuario = new Usuario();
    this.perfiles = ["admin", "usuario", "invitado", "tester", "anonimo"];
    this.sexos = ["masculino", "femenino"];
  }

  ngOnInit() {}

  async Registrar(){
    if(this.usuario.correo && this.usuario.clave && this.perfil && this.sexo){
      try{
        await this.auth.RegistrarUsuario(this.usuario);
        this.toastRegistroExitoso("Se ha registrado exitosamente");
        this.router.navigate(['/login']);
      }
      catch(error){
        switch (error.code) {
          case 'auth/invalid-email':
            this.alertError("Ingrese un correo electronico valido");
            break;
          case 'auth/weak-password':
            this.alertError("La contraseña debe tener al menos 6 caracteres");
            break;
          case 'auth/email-already-in-use':
            this.alertError("Este mail ya esta registrado");
            break;
          default:
            this.alertError("Error inesperado: "+error.message);
            break;
        }
      }
    }
    else{
      this.alertError('Complete todos los campos');
    }
  }

  Volver(){
    this.router.navigate(["login"]);
  }

  async alertError(mensaje: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alertErroresLoguear',
      header: 'Error',
      message: mensaje,
      buttons: ['Entendido'],
    });
    await alert.present();
  }

  async toastRegistroExitoso(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: "light",
      position: "middle"
    });
    toast.present();
  }

}
