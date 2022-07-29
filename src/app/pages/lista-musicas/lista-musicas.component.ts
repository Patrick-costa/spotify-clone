import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { Musica } from 'src/app/models/musica';
import { Playlist } from 'src/app/models/playlist';
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

  rota: any;

  musicas: Musica[] = []
  playlists: Playlist[] = [];
  musicaAtual: Musica = newMusica();
  idPlaylist: string;
  playIcone = faPlay;

  bannerImagemUrl = '';
  bannerTexto = '';
  descricao = '';
  uri = '';

  titulo: string = '';
  
  subs: Subscription[] = [];

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
    this.idPlaylist = this.activatedRoute.snapshot.params['id'];
    this.buscarPlaylistsUsuario();
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

  async buscarPlaylistsUsuario(){
    const lista = await this.spotifyService.buscarPlaylistUsuario();
    this.playlists = lista;
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
    console.log(playlistMusicas);
    this.definirDadosPagina(playlistMusicas.nome, playlistMusicas.imagemUrl, playlistMusicas.musicas, playlistMusicas.descricao, playlistMusicas.uri);
    this.titulo = 'Musicas Playlist: '+playlistMusicas.nome
  
  }



  async obterDadosArtista(artistaId: string){

  }

  definirDadosPagina(bannerText: string, bannerImage: string, musicas: Musica[], descricao: string, uri: string){
    this.bannerImagemUrl = bannerImage;
    this.bannerTexto = bannerText;
    this.musicas = musicas;
    this.uri = uri;
    this.descricao = descricao;
  }

  obterArtistas(musica: Musica){
    return musica.artistas.map(artistas => artistas.nome).join(', ');
  }

  async executarMusica(musica: Musica){
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  async seguirPlaylist(){
    await this.spotifyService.addPlaylist(this.idPlaylist);
  }


}
