import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components made with ng g c 
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlayerComponent } from './components/player/player.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LibreriaComponent } from './components/libreria/libreria.component';
import { CaricaComponent } from './components/carica/carica.component';
import { FooterComponent } from './components/footer/footer.component';
import { DiscroverComponent } from './components/discrover/discrover.component';

import { HttpClientModule } from '@angular/common/http';
import { AlbumComponent } from './components/album/album.component';
import { SongComponent } from './components/song/song.component';
import { E404Component } from './components/errrors/e404/e404.component';
import { E401Component } from './components/errrors/e401/e401.component';
import { E400Component } from './components/errrors/e400/e400.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlayerComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    LibreriaComponent,
    CaricaComponent,
    FooterComponent,
    DiscroverComponent,
    AlbumComponent,
    SongComponent,
    E404Component,
    E401Component,
    E400Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
