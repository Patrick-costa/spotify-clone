import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanLoad {

  constructor(private router: Router,
              private spotifyService: SpotifyService){

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = localStorage.getItem('token');
    
    if(!token) {
      return this.naoAutenticado();
    }

    return new Promise(async (res) => {
      const usuarioCriado = await this.spotifyService.inicializarUsuario();
      if (usuarioCriado){
        console.log('entrando aqui');
        res(true);
      }
      else
        res(this.naoAutenticado());
    })
  }

  naoAutenticado() {
    console.log('não autenticado')
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}