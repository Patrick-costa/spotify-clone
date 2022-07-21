import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { Musica } from 'src/app/models/musica';
import { PlayerService } from 'src/app/services/player-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: Musica = newMusica();
  subs: Subscription[] = [];

  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;
  pauseIcone = faPause;
  playIcone = faPlay;

  pausado: boolean = false;
  play: boolean = true;

  constructor(private playerService: PlayerService,
              private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.obterMusicaTocando();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }


  obterMusicaTocando(){
   const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musica = musica;
    });

    this.subs.push(sub);
  }

  async voltarMusica(){
    await this.spotifyService.voltarMusica();
  }

  async proximaMusica(){
    await this.spotifyService.proximaMusica();
  }

  async pausarMusica(){
    await this.spotifyService.pausarMusica();
  }

  async playMusica(){
    await this.spotifyService.playMusica();
  }
}
