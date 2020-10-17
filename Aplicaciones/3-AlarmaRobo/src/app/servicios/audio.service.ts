import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private nativeAudio: NativeAudio) { }

  async CargarAudio(key: string, asset: string){
    await this.nativeAudio.preloadSimple(key, asset);
  }

  async ReproducirAudio(key: string){
    await this.nativeAudio.play(key);
  }
}
