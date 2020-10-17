import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { CamaraService } from 'src/app/servicios/camara.service';
import { DDBBService } from 'src/app/servicios/ddbb.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.component.html',
  styleUrls: ['./cosas-feas.component.scss'],
})
export class CosasFeasComponent implements OnInit {

  CorreoUsuario: string;
  db: any;
  fotoSacada: any;
  galeriaCompleta: Array<any>;
  galeriaDeVotos: Array<any>;
  fotosSacadas; // TO DO
  sacoFotos:boolean;
  constructor(private router: Router,
              private auth: AutenticacionService, 
              private bd: DDBBService,
              public camara: CamaraService,
              public toastController: ToastController,
              private alertCtrl: AlertController,
              public loadingController: LoadingController) { 
      this.CargarUsuarioActual()
  }

  ngOnInit() {
    this.bd.ObtenerDatos('cosas-feas').subscribe((listaSnapshot) => {
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

    this.bd.ObtenerImagenesVotadas('cosas-feas').subscribe((listaSnap)=>{
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
      this.alertError("ERROR AL OBTENER USER-cosas feas");
    }
  }

  async SubirFoto(){
    try{
      //  this.camara.photos[0].webviewPath ------->  ACA ESTA LA FOTO
      await this.bd.AgregarImagen(this.CorreoUsuario, this.fotoSacada, "cosas-feas");
      this.presentLoading("Subiendo foto...");
      this.toastFotoSubida("Foto subida correctamente");
      this.camara.photos = [];   
      this.galeriaCompleta = this.galeriaCompleta.sort(this.OrdenarPorFecha);   
    }    
    catch(error){
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
      color: "medium",
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
      this.bd.VotarImagen(this.CorreoUsuario, FotoVotada.id, 'cosas-feas');
      // let imagenActualizar = this.bd.ObtenerUnaImagen(FotoVotada.id, 'cosas-lindas');
      FotoVotada.datos.cantidadVotos+=1;
      this.bd.ActualizarVotosDeFoto(FotoVotada.id,'cosas-feas', FotoVotada.datos);
    }    
    else{
      this.alertError("Ya voto esta foto");
    }
  }

  Volver(){
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
