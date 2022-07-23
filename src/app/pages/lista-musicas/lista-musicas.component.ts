import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { Musica } from 'src/app/models/musica';
import { PlayerService } from 'src/app/services/player-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-lista-musicas',
  templateUrl: './lista-musicas.component.html',
  styleUrls: ['./lista-musicas.component.scss']
})
export class ListaMusicasComponent implements OnInit, OnDestroy {

  constructor(
   private activatedRoute: ActivatedRoute,
   private spotifyService: SpotifyService,
   private playerService: PlayerService,
  ) { }

  musicas: Musica[] = []
  musicaAtual: Musica = newMusica();
  idPlaylist: string;
  playIcone = faPlay;

  bannerImagemUrl = '';
  bannerTexto = '';

  titulo: string = '';
  
  subs: Subscription[] = [];

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
    this.idPlaylist = this.activatedRoute.snapshot.params['id'];
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  obterMusicaAtual(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  obterMusicas(){
    const sub = this.activatedRoute.paramMap.subscribe(async params => {
      const tipo = params.get('tipo');
      const id = params.get('id');
      await this.obterDadosPagina(tipo, id);
    });

    this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string){
    if(tipo == 'playlist'){
      await this.obterDadosPlaylist(id);
    } else {
      await this.obterDadosArtista(id);
    }
  }

  async obterDadosPlaylist(playlistId: string){
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(playlistId);
    this.definirDadosPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas);
    this.titulo = 'Musicas Playlist: '+playlistMusicas.nome
  
  }

  async obterDadosArtista(artistaId: string){

  }

  definirDadosPagina(bannerText: string, bannerImage: string, musicas: Musica[]){
    this.bannerImagemUrl = bannerImage;
    this.bannerTexto = bannerText;
    this.musicas = musicas;
  }

  obterArtistas(musica: Musica){
    return musica.artistas.map(artistas => artistas.nome).join(', ');
  }

  async executarMusica(musica: Musica){
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

}
