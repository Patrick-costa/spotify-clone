import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { Musica } from 'src/app/models/musica';
import { NovaPlaylist } from 'src/app/models/novaPlaylist';
import { PlayerService } from 'src/app/services/player-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  musicas: Musica[] = [];
  musicaAtual: Musica = newMusica();
  novaPlaylist: NovaPlaylist;

  subs: Subscription[] = [];
  token = localStorage.getItem('token');
  playIcone = faPlay;

  constructor(private spotifyService: SpotifyService,
    private playerService: PlayerService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  async obterMusicas() {
    this.musicas = await this.spotifyService.buscarMusicas();
    this.spotifyService.obterArtistasUsuario();
  }

  obterArtistas(musica: Musica) {
    return musica.artistas.map(artistas => artistas.nome).join(', ');
  }

  async executarMusica(musica: Musica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

}
