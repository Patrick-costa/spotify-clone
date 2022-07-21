import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { newMusica } from '../Common/factories';
import { Musica } from '../models/musica';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService{

  musicaAtual = new BehaviorSubject<Musica>(newMusica());
  timerId: any = null;

  constructor(
    private spotifyService: SpotifyService
  ) { 
    this.obterMusicaAtual();
  }

  async obterMusicaAtual(){
    clearTimeout(this.timerId);
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);
    this.timerId = setInterval(async () => {
      await this.obterMusicaAtual();
    }, 3000);
  }

  definirMusicaAtual(musica: Musica){
    this.musicaAtual.next(musica);
  }

}
