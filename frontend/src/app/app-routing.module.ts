import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

// Components 
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LibreriaComponent } from './components/libreria/libreria.component';
import { CaricaComponent } from './components/carica/carica.component';
import { DiscroverComponent } from './components/discrover/discrover.component';
import { AlbumComponent } from './components/album/album.component';
import { SongComponent } from './components/song/song.component'; 
import { E404Component } from './components/errrors/e404/e404.component';
import { E400Component } from './components/errrors/e400/e400.component';
import { E401Component } from './components/errrors/e401/e401.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { E403Component } from './components/errrors/e403/e403.component';

// All the paths with components
const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "library", component: LibreriaComponent, canActivate: [authGuard]},
  { path: "discovery", component: DiscroverComponent, canActivate: [authGuard]},
  { path: "carica", component: CaricaComponent, canActivate: [authGuard]},
  { path: "album/:id", component: AlbumComponent, canActivate: [authGuard]},
  { path: "song/:id", component: SongComponent, canActivate: [authGuard]},
  { path: "error/404", component: E404Component},
  { path: "error/401", component: E401Component},
  { path: "error/400", component: E400Component},
  { path: "error/403", component: E403Component},
  { path: "dashboard", component: DashboardComponent, canActivate: [authGuard]},
  { path: "**", redirectTo:""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
