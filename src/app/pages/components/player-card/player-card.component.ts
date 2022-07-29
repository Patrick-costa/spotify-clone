import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { Musica } from 'src/app/models/musica';
import { PlayerService } from 'src/app/services/player-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faVolumeUp, faVolumeControlPhone, faVolumeDown, faVolumeHigh, faVolumeLow, faVolumeMute, faVolumeOff, faVolumeTimes } from '@fortawesome/free-solid-svg-icons';
import { addMilliseconds, format } from "date-fns";

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  musica: Musica = newMusica();
  subs: Subscription[] = [];
  tempo = '';
  cronometroMusica: string;
  porcentagem = 0;

  anteriorIcone = faStepBackward;
  proximoIcone = faStepForward;
  pauseIcone = faPause;
  playIcone = faPlay;
  volumeIcone = faVolumeHigh;

  pausado: boolean = false;
  play: boolean = true;
  cronometro: any;

  constructor(private playerService: PlayerService,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.obterMusicaTocando();
    this.definirVolumeMaximo();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  //FUNÇÃO FUTURA
  // alterarTempo(){
  //   let intervalo = setInterval( () => {
  //     console.log(this.tempo)
  //     let value = this.porcentagem;
  //     let minutos = this.tempo.split(':').map(Number);
  //     console.log(minutos);
  //     let ms = (minutos[0] * 60 * 1000) + (minutos[1] * 1000);
  //     console.log(ms);
  //     let porcentagem = 1000 * this.porcentagem;
  //     const formatado = format(porcentagem, "mm:ss");
  //     this.porcentagem++;
  //     console.log(formatado);
  //     console.log(porcentagem);
  //     if(porcentagem == ms){
  //       clearTimeout(intervalo);
  //     }
  //   }, 1000)
  // }


  obterMusicaTocando() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musica = musica;
      this.tempo = musica.tempo;
    });
    this.subs.push(sub);
  }

  async voltarMusica() {
    await this.spotifyService.voltarMusica();
  }

  async proximaMusica() {
    await this.spotifyService.proximaMusica();
  }

  async pausarMusica() {
    await this.spotifyService.pausarMusica();
    if (this.musica.tocando == true) {
      this.musica.tocando = false;
    } else {
      this.musica.tocando = true
    }
  }

  definirVolumeMaximo() {
    this.spotifyService.controlarVolume(100);
  }

  controlarVolume(evt: any) {
    const volume = evt.srcElement.value;
    if (volume >= 50 && volume <= 100) {
      this.volumeIcone = faVolumeHigh;
    } else if (volume < 50 && volume > 1) {
      this.volumeIcone = faVolumeDown
    } else if (volume == 0) {
      this.volumeIcone = faVolumeOff;
    }
    this.spotifyService.controlarVolume(volume);
  }

  async playMusica() {
    await this.spotifyService.playMusica();
    if (this.musica.tocando == true) {
      this.musica.tocando = false;
    } else {
      this.musica.tocando = true
    }
  }
}
