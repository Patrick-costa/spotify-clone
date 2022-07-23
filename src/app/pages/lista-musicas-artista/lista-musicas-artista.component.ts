import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factories';
import { Album } from 'src/app/models/albums';
import { Musica } from 'src/app/models/musica';
import { PlayerService } from 'src/app/services/player-service.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-lista-musicas-artista',
  templateUrl: './lista-musicas-artista.component.html',
  styleUrls: ['./lista-musicas-artista.component.scss']
})
export class ListaMusicasArtistaComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router
  ) { }

  idArtista: string;
  idAlbum: string;

  musicas: Musica[] = [];
  musicaAtual: Musica = newMusica();
  albuns: Album[] = [];
  subs: Subscription[] = [];

  albumNome: string;
  nomeArtista: string;
  //Icones
  playIcone = faPlay;

  ngOnInit(): void {
    this.idArtista = this.activatedRoute.snapshot.params['idArtista'];
    this.idAlbum = this.activatedRoute.snapshot.params['idPlaylist'];
    this.obterMusicasArtista();

  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  obterMusicasArtista() {
    this.obterAlbum();
    setTimeout(async () => {      
      const musicas = await this.spotifyService.obterMusicasAlbum(this.idAlbum, this.albuns[0]);
      this.musicas = musicas;
    }, 100);
  }

  async obterAlbum(){
    const albuns = await this.spotifyService.obterAlbunsArtista(this.idArtista);
    this.albuns = albuns;

    //Define o nome do album para variavel albumNome
    albuns.forEach(x => {
      if(x.id == this.idAlbum){
        this.albumNome = x.nome
      }
    });
  }

  async executarMusica(musica: Musica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  obterArtistas(musica: Musica) {
    return musica.artistas.map(artistas => artistas.nome).join(', ');
  }

  irParaAlbum(idAlbum: string) {
    this.router.navigate(['player/artista-playlist/' + this.idArtista + '/' + idAlbum]);
    window.location.reload();
  }

}
