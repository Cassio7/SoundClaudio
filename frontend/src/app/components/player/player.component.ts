import { Component } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SongService } from 'src/app/services/song/song.service';
import { Song } from 'src/app/models/song';

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
  track: number = 0;
  mp3: { id: number, list: any } | null = null;

  song: Song = {
    id: 0,
    namesong: '',
    img: '',
    name: '',
    nameart: '',
    mp3: ''
  }

  constructor(private authServ: AuthService,
    private songServ: SongService) {

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
    // Only if auth
    if (this.authServ.isAuthenticated()) {
      if (this.mp3 != this.songServ.getMp3Info() && this.songServ.getMp3Info() != null) {
        // Get the info from service
        this.mp3 = this.songServ.getMp3Info()
        console.log(this.mp3?.list)
        // If is the return is not null
        if (this.mp3 != null) {
          // Get the right mp3
          this.find()
        }
      }
      if (this.audio.paused) {
        this.audio.play();
      }
      else
        this.audio.pause()
    }
    else
      alert("Your are not logged!")
  }

  // Go to the prev song
  prev(): void {
    this.track--;
    if (this.find())
      this.audio.play()
    else {
      if (this.mp3 != null)
      // If this was the first one go to the last
        this.track = this.mp3.list.length - 1;
      if (this.find())
        this.audio.play()
    }
  }

  // Go to the next song
  next(): void {
    this.track++;
    if (this.find())
      this.audio.play()
    else {
      if (this.mp3 != null)
      // If this was the last one get back to start
        this.track = 0;
      if (this.find())
        this.audio.play()
    }
  }

  // Control the volume
  volumeSlider(event: any): void {
    this.audio.volume = event.target.value / 100;
  }

  volumeMute(): void {
    if (this.audio.volume !== 0) {
      this.audio.volume = 0;
    } else {
      this.audio.volume = 0.5;
    }
  }

  // Control the duration of the song
  durationSlider(event: any): void {
    this.audio.currentTime = event.target.value;
  }

  // Get the right song
  find(): boolean {
    if (this.mp3 != null) {
      // Find the song by index, if is null return false
      if (this.mp3.list[this.track]) {
        this.audio.src = this.mp3.list[this.track].mp3;
        this.song = {
          id: this.mp3.list[this.track].id,
          namesong: this.mp3.list[this.track].namesong,
          img: this.mp3.list[this.track].img,
          name: this.mp3.list[this.track].name,
          nameart: this.mp3.list[this.track].nameart,
          mp3: this.mp3.list[this.track].mp3,
        }
        return true;
      }
      else
        return false;
    }
    return false;
  }

  // Shuffle function random song list
  // shuffle(): void{
  //   if (this.mp3 != null) {
  //     console.log(this.songServ.getMp3Info())
  //     let currentIndex = this.mp3.list.length,  randomIndex;

  //     // While there remain elements to shuffle.
  //     while (currentIndex > 0) {

  //       // Pick a remaining element.
  //       randomIndex = Math.floor(Math.random() * currentIndex);
  //       currentIndex--;

  //       // And swap it with the current element.
  //       [this.mp3.list[currentIndex], this.mp3.list[randomIndex]] = [
  //         this.mp3.list[randomIndex], this.mp3.list[currentIndex]];
  //     }
  //     console.log(this.mp3.list)
  //     console.log('Dal get ')
  //     console.log(this.songServ.getMp3Info())
  //   }
  // }
}

