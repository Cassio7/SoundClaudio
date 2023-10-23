import { Component} from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent{
  audio = new Audio();
  showRangeInput = false;
  play():void{
    if(this.audio.paused){
      if (this.audio.readyState === 0) {
        this.audio.src = '../assets/mp3/Forever/Galaxy.mp3';
      }
      this.audio.play();
    }
    else
      this.audio.pause()
    
  }
}
