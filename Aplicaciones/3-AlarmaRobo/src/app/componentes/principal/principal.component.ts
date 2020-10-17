import { Component, OnInit } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { Subscription } from 'rxjs';
import { AudioService } from 'src/app/servicios/audio.service';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { Usuario } from 'src/app/clases/usuario';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  estaApagada: boolean = true;
  subscription: Subscription;
  ejeyAnterior = 0;
  ejexAnterior = 0;
  pedirClave: boolean = false;
  claveIngresada: string;
  usuario: Usuario = new Usuario();

  options: GyroscopeOptions = {
    frequency: 700
 };


 constructor(private deviceMotion: DeviceMotion, 
             private audio: AudioService, 
             private flash: Flashlight,
             private vibration: Vibration,
             private auth: AutenticacionService,
             private alertCtrl: AlertController) { }

  async ngOnInit() { 
    await this.audio.CargarAudio("izquierda", 'assets/audios/izquierda.mp3');
    await this.audio.CargarAudio("derecha", 'assets/audios/derecha.mp3');
    await this.audio.CargarAudio("vertical", 'assets/audios/vertical.mp3');
    await this.audio.CargarAudio("horizontal", 'assets/audios/horizontal.mp3');
  }

  async PulsarBoton(){
    // this.estaApagada = !this.estaApagada;
    if(this.estaApagada){
      this.subscription = this.deviceMotion.watchAcceleration(this.options).subscribe((acceleration: DeviceMotionAccelerationData) => {  
        this.VerificarOrientacion(acceleration.x, acceleration.y, acceleration.z);
      }); 
      this.estaApagada = !this.estaApagada;
    }
    else{
      this.pedirClave = true;      
    }
  }

  async VerificarOrientacion(ejex, ejey, ejez){    

    if(!this.estaApagada){
      if(this.ejeyAnterior>6){
        // if(ejey<1 && ejex<1)
        if(ejey<2)
        {
          //REPRODUCIR HORIZONTAL
          this.vibration.vibrate(5000);
          await this.audio.ReproducirAudio("horizontal");
        }
      }

      if(this.ejexAnterior<1 && this.ejexAnterior>-1){
        if(ejey<1 && ejex>3){
          // REPRODUCIR IZQUIERDA
          await this.audio.ReproducirAudio("izquierda");
        }
        else if(ejey<1 && ejex<-3){
          //  REPRODUCIR DERECHA
          await this.audio.ReproducirAudio("derecha");
        }
      }

      if(this.ejeyAnterior<2 && ejey>7){
        //Reproducir vertical
        await this.flash.switchOn();
        setTimeout(async() => {
          await this.flash.switchOff();
        }, 5000);

        await this.audio.ReproducirAudio("vertical");
      }
      this.ejexAnterior = ejex;      
      this.ejeyAnterior = ejey;

    }    
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

  async ConfirmarDesactivar(){
      this.pedirClave = true;
      var user = await this.auth.ObtenerActual();
      this.usuario.correo = user.email;
      this.usuario.clave = this.claveIngresada;
      if(this.usuario.clave){
        try{
          await this.auth.LoguearUsuario(this.usuario);
          this.estaApagada = !this.estaApagada;
          this.pedirClave = false;
          this.subscription.unsubscribe();
        }      
        catch(error){
          switch (error.code) {
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
        this.alertError("Ingrese su clave");
      }  
  }

  Cancelar(){    
    this.pedirClave = false;
  }
}
