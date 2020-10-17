import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { DDBBService } from 'src/app/servicios/ddbb.service';
import { Plugins, CameraResultType } from '@capacitor/core';
import { Router } from '@angular/router';
import { CamaraService } from 'src/app/servicios/camara.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

const { Camera } = Plugins; 

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.component.html',
  styleUrls: ['./cosas-lindas.component.scss'],
})
export class CosasLindasComponent implements OnInit {

  CorreoUsuario: string;
  db: any;
  fotoSacada: any;
  galeriaCompleta: Array<any>;
  galeriaDeVotos: Array<any>;
  fotosSacadas; // TO DO
  sacoFotos:boolean;
  constructor(private auth: AutenticacionService, 
              private bd: DDBBService,
              private router: Router,
              public camara: CamaraService,
              public toastController: ToastController,
              private alertCtrl: AlertController,
              public loadingController: LoadingController) { 
    this.CargarUsuarioActual();    
  }

  ngOnInit() {
    this.bd.ObtenerDatos('cosas-lindas').subscribe((listaSnapshot) => {
      this.galeriaCompleta = [];
      listaSnapshot.forEach((datoImg: any) => {
        this.galeriaCompleta.push({
          id: datoImg.payload.doc.id,
          datos: datoImg.payload.doc.data(),               
        });    
      })
      this.galeriaCompleta = this.galeriaCompleta.sort(this.OrdenarPorFecha);
    });

    this.presentLoading("Cargando imagenes...");

    this.bd.ObtenerImagenesVotadas('cosas-lindas').subscribe((listaSnap)=>{
      this.galeriaDeVotos = [];
      listaSnap.forEach((datoActual:any)=>{
        this.galeriaDeVotos.push({
          datosVotos: datoActual.payload.doc.data(),
        })
      })
    })
  }

  OrdenarPorFecha(a,b){
    if(a.datos.fechaParaComparar<b.datos.fechaParaComparar){
      return 1;
    }
    else if(a.datos.fechaParaComparar>b.datos.fechaParaComparar){
      return -1;
    }
    return 0;
  }

  async CargarUsuarioActual(){
    try{
      let usuario = await this.auth.ObtenerUsuarioActual();
      if(usuario==null){
        this.alertError("Error al obtener usuario, vuelva a iniciar sesion");
      }
      else{
        this.CorreoUsuario = usuario.email;
      }
    }    
    catch(error){
      this.alertError("ERROR AL OBTENER USER-cosas lindas");
    }
  }

  async SubirFoto(){
    try{
      //  this.camara.photos[0].webviewPath ------->  ACA ESTA LA FOTO
      this.presentLoading("Subiendo foto...");
      await this.bd.AgregarImagen(this.CorreoUsuario, this.fotoSacada, "cosas-lindas");      
      this.toastFotoSubida("Foto subida correctamente");
      this.camara.photos = [];
      this.galeriaCompleta = this.galeriaCompleta.sort(this.OrdenarPorFecha);
    }    
    catch(error){
      console.log(error);
      this.alertError("PASO ALGO: "+error);    
    }
  }

  async TomarFoto() {
    try{
      await this.camara.AgregarNuevaFoto();
      this.sacoFotos = true;
      console.log("Tiene fotos sacadas");
      if(this.camara.photos.length>0){
        this.fotoSacada = this.camara.photos[0].webviewPath;
      }      
      // ESTAN GUARDADAS TEMPORALMENTE EN camara.photos
      // y puedo ver la imagen en camara.photos.webViewPath
    }    
    catch(error){
      if(error!="User cancelled photos app"){
        this.alertError("ALGO PASO: "+error);
      }
      //SINO SOLO CANCELO SUBIR FOTO
    }
  }

  async toastFotoSubida(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: "primary",
      position: "bottom"
    });
    toast.present();
  }


  Votar(FotoVotada){
    //  YA ME SUMA EL VOTO
    let yaFueVotada = false;
    this.galeriaDeVotos.forEach(element => {
      if(element.datosVotos.usuario == this.CorreoUsuario && element.datosVotos.idImagenVotada==FotoVotada.id){
        yaFueVotada = true;
      }
    });
    if(!yaFueVotada){
      this.bd.VotarImagen(this.CorreoUsuario, FotoVotada.id, 'cosas-lindas');
      // let imagenActualizar = this.bd.ObtenerUnaImagen(FotoVotada.id, 'cosas-lindas');
      FotoVotada.datos.cantidadVotos+=1;
      this.bd.ActualizarVotosDeFoto(FotoVotada.id,'cosas-lindas', FotoVotada.datos);
    }    
    else{
      this.alertError("Ya voto esta foto");
    }
  }

  Volver(){
    console.log(this.galeriaCompleta);
    this.router.navigate(['principal']);
  }

  async alertError(mensaje) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alertErrorLogin',
      header: 'Error',
      message: mensaje,
      buttons: ['Entendido']
    });
    await alert.present();
  }


  async presentLoading(mensaje) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensaje,
      duration: 3000,
      spinner: "bubbles"
    });
    await loading.present();

  }
}
