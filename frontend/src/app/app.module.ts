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
import { AlbumComponent } from './components/album/album.component'

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
    AlbumComponent
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
