import { Injectable } from '@angular/core';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Plugins } from '@capacitor/core';
const { ScreenOrientation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class OrientacionService {
  screen_orientation: string;
  screen_orientation_event: string;
  screen_orientation_lock: string;
  constructor() { 
    this.screen_orientation = "";
    this.screen_orientation_event = "";
    this.screen_orientation_lock = "";
    // this.subscribeToOrientationChanges();
  }

  
}
