import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  // private sounds: Sound[] = [];
  // private audioPlayer: HTMLAudioElement = new Audio();
  // private forceWebAudio: boolean = true; PARA PROBAR EN LA WEB
  // private forceWebAudio: boolean = false;
  private sounds: Sound[] = [];
  // private audioPlayer: HTMLAudioElement = new Audio();
  // private forceWebAudio = false;
  // private isNative = false;

  constructor(private platform: Platform, private nativeAudio: NativeAudio) {  }

  
  
  async preload(key: string, asset: string){
    try{
      await this.nativeAudio.preloadSimple(key, asset);
    }
    catch(err){
      alert("ERROR AL CARGAR "+err);
    }

    // if(!this.forceWebAudio){
    //   this.nativeAudio.preloadSimple(key, asset);
    //   this.sounds.push({
    //     key: key,
    //     asset: asset,
    //     isNative: true
    //   });
    // } else {
    //   let audio = new Audio();
    //   audio.src = asset;
    //   this.sounds.push({
    //     key: key,
    //     asset: asset,
    //     isNative: false
    //   });
    // }
  }
  

  async play(key: string){
    try{
      await this.nativeAudio.play(key);
    }
    catch(err){
      alert("Error al reproducir "+err);
    }
    // let soundToPlay = this.sounds.find((sound) => {
    //   return sound.key === key;
    // });    

    // if(soundToPlay.isNative){

    //   this.nativeAudio.play(soundToPlay.asset).then((res) => {
    //     console.log(res);
    //   }, (err) => {
    //     // console.log(err);
    //     alert(err);
    //   });

    // } else {

    //   this.audioPlayer.src = soundToPlay.asset;
    //   this.audioPlayer.play();
    // }
  }

  async vaciar(key: string){
    try{
      await this.nativeAudio.unload(key);
    }    
    catch(err){
      alert("error al borrar: "+err);
    }
  }

}


interface Sound {
  key: string;
  asset: string;
  isNative: boolean
}