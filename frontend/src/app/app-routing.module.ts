import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LibreriaComponent } from './components/libreria/libreria.component';
import { CaricaComponent } from './components/carica/carica.component';
import { DiscroverComponent } from './components/discrover/discrover.component';
import { AlbumComponent } from './components/album/album.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "library", component: LibreriaComponent},
  { path: "discovery", component: DiscroverComponent},
  { path: "carica", component: CaricaComponent},
  { path: "album", component: AlbumComponent},
  { path: "**", redirectTo:""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
