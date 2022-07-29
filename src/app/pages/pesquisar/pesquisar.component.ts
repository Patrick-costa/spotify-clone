import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { SpotifyAlbumParaAlbum, SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifyTrackPesquisaParaMusica } from 'src/app/Common/spotifyHelper';
import { Album } from 'src/app/models/albums';
import { Artista } from 'src/app/models/artistas';
import { Musica } from 'src/app/models/musica';
import { Playlist } from 'src/app/models/playlist';
import { PlayerService } from 'src/app/services/player-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import SwiperCore, { Swiper, SwiperOptions, Virtual } from 'swiper';

// install Swiper modules
SwiperCore.use([Virtual]);
@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styleUrls: ['./pesquisar.component.scss']
})
export class PesquisarComponent implements OnInit {

  campoPesquisa = '';

  musicaAtual: Musica = newMusica();

  musicas: Musica[] = [];
  album: Album[] = [];
  artistas: Artista[] = [];
  playlists: Playlist[] = [];
  melhorResultado = newMusica();
  subs: Subscription[] = [];
  idAlbum = '';

  rota: any;
  iconePlay = faPlay;


  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this.rota = this.activatedRoute.component.name
    console.log(this.rota);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  larguraTela = window.innerWidth;

  definirSlidePerView() {
    if (this.larguraTela > 2210) {
      return 7
    } else if(this.larguraTela >= 1900 && this.larguraTela < 2210){
      return 6.3
    } else if(this.larguraTela < 1900 && this.larguraTela > 1780 ){
      return 5.5
    } else if(this.larguraTela < 1780 && this.larguraTela >= 1550){
      return 4.5
    } else if(this.larguraTela < 1500 && this.larguraTela >= 1360){
      return 3.5
    } else if(this.larguraTela < 1360 && this.larguraTela > 1280 ){
      return 3.2
    } else if(this.larguraTela < 1280 && this.larguraTela >= 1120){
      return 2.5
    } else if(this.larguraTela < 1120){
      return 1.8
    }
      return 0
  }

  swiperConfig: SwiperOptions = {
    slidesPerView: this.definirSlidePerView(),
    spaceBetween: 30,
    navigation: true,
  }

  definirPesquisa(pesquisa: string) {
    this.campoPesquisa = pesquisa;
  }

  buscar(evt: any) {
    this.campoPesquisa = evt.srcElement.value;
    if (this.campoPesquisa.length > 0) {
      this.buscarMusicas();
      this.buscarAlbuns();
      this.buscarArtistas();
      this.buscarPlaylists();
    }
  }

  buscarMusicas() {
    const sub = this.spotifyService.buscarMusicasPesquisa(this.campoPesquisa).subscribe({
      next: (x) => {
        const obj = Object.values(x);
        let musica = obj.map(x => x.items);
        let array = musica.pop();
        this.musicas = array.map(SpotifyTrackPesquisaParaMusica);
        this.definirMelhorResultado(this.musicas.shift());
      },
      error: (e) => {
        console.log(e);
      }
    });

    this.subs.push(sub);
  }

  definirMelhorResultado(musica: Musica) {
    this.melhorResultado = musica;
  }

  definirArtistas(musica: Musica) {
    return musica.artistas.map(artistas => artistas.nome).join(', ')
  }

  buscarAlbuns() {
    const sub = this.spotifyService.buscarAlbunsPesquisa(this.campoPesquisa).subscribe({
      next: (x) => {
        const obj = Object.values(x);
        let album = obj.map(x => x.items);
        let array = album.pop();
        this.album = array.map(SpotifyAlbumParaAlbum);
      },
      error: (e) => {
        console.log(e);
      }
    });

    this.subs.push(sub);

  }

  buscarArtistas() {

    const sub = this.spotifyService.buscarArtistasPesquisa(this.campoPesquisa).subscribe({
      next: (x) => {
        const obj = Object.values(x);
        let artista = obj.map(x => x.items);
        let array = artista.pop();
        this.artistas = array.map(SpotifyArtistaParaArtista);
      },
      error: (e) => {
        console.log(e);
      }
    });

    this.subs.push(sub);
  }

  buscarPlaylists() {
    const sub = this.spotifyService.buscarPlaylistPesquisa(this.campoPesquisa).subscribe({
      next: (x) => {
        const obj = Object.values(x);
        let playlist = obj.map(x => x.items);
        let array = playlist.pop();
        this.playlists = array.map(SpotifyPlaylistParaPlaylist);
        console.log(this.playlists);
      },
      error: (e) => {
        console.log(e);
      }
    });
    this.subs.push(sub);
  }

  async executarMusica(musica: Musica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  async obterAlbunsArtista(id: string) {
    const albuns = await this.spotifyService.obterAlbunsArtista(id);
    this.idAlbum = albuns[0].id;
  }

  acessarArtista(id: string) {
    this.obterAlbunsArtista(id);
    setTimeout(() => {
      this.router.navigateByUrl('player/artista-playlist/' + id + '/' + this.idAlbum);
    }, 500);
  }

  irParaAlbum(idAlbum: string) {
    this.router.navigate([`player/album/${idAlbum}`]);
  }

  async executarPlaylist(uri: string){
    console.log(uri);
    await this.spotifyService.executarPlaylist(uri);
  }

  irParaPlaylist(playlistId: string) {
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }

}