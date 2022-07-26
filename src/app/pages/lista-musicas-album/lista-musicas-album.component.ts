import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { newMusica } from 'src/app/Common/factories';
import { Album } from 'src/app/models/albums';
import { Musica } from 'src/app/models/musica';
import { PlayerService } from 'src/app/services/player-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { faAngleLeft, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-musicas-album',
  templateUrl: './lista-musicas-album.component.html',
  styleUrls: ['./lista-musicas-album.component.scss']
})
export class ListaMusicasAlbumComponent implements OnInit, OnDestroy {

  constructor(private spotifyService: SpotifyService,
              private activatedRoute: ActivatedRoute,
              private playerService: PlayerService,
              private router: Router) { }

  id: string;
  album: Album;
  musicas: Musica[] = [];
  musicaAtual: Musica = newMusica();
  subs: Subscription[] = []
   //Icones
   playIcone = faPlay;
   voltarIcone = faAngleLeft;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['idAlbum'];
    this.buscarTracksAlbum();
    this.obterMusicaAtual();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async buscarTracksAlbum(){
    const musicas = await this.spotifyService.obterMusicasAlbum(this.id, await this.obterAlbumId());
    this.musicas = musicas;
    console.log(this.musicas)
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });
    this.subs.push(sub);
  }

  async obterAlbumId(){
    this.album = await this.spotifyService.obterAlbumPeloId(this.id);
    return this.album;
  }

  async executarMusica(musica: Musica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  obterArtistas(musica: Musica) {
    return musica.artistas.map(artistas => artistas.nome).join(', ');
  }

  voltar(){
    window.history.back();
  }

}
