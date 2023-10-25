import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  audio = new Audio();
  showRangeInput = false;
  musicLength: string = '0:00';
  duration: number = 1;
  currentTime: string = '0:00';

  constructor() {

    this.audio.ondurationchange = () => {
      const totalSeconds = Math.floor(this.audio.duration),
        duration = moment.duration(totalSeconds, 'seconds');
      this.musicLength = duration.seconds() < 10 ?
        `${Math.floor(duration.asMinutes())}:
                          0${duration.seconds()}` :
        `${Math.floor(duration.asMinutes())}:
                          ${duration.seconds()}`;
      this.duration = totalSeconds;
    }

    this.audio.ontimeupdate = () => {
      const duration = moment.duration(
        Math.floor(this.audio.currentTime), 'seconds');
      this.currentTime = duration.seconds() < 10 ?
        `${Math.floor(duration.asMinutes())}:
                          0${duration.seconds()}` :
        `${Math.floor(duration.asMinutes())}:
                          ${duration.seconds()}`;
    }
  }

  play(): void {
    if (this.audio.paused) {
      if (this.audio.readyState === 0) {
        this.audio.src = '../assets/mp3/Forever/Raydar.mp3';
      }
      this.audio.play();
    }
    else
      this.audio.pause()

  }

  volumeSlider(event: any) {
    this.audio.volume = event.target.value / 100;
  }
  durationSlider(event: any) {
    this.audio.currentTime = event.target.value;
  }
}
