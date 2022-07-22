import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Playlist } from 'src/app/models/playlist';
import { SpotifyService } from 'src/app/services/spotify.service';


@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  playlists: Playlist[] = [];

  constructor(private spotifyService: SpotifyService,
              private router: Router,) { }

  menuSelecionado = 'Home'

  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playlistIcone = faMusic;

  ngOnInit(): void {
    setTimeout(() => {
      this.buscarPlaylist();
    }, 200);
  }

  botaoClick(botao: string){
    this.menuSelecionado = botao;
    this.router.navigateByUrl('player/home')
  }

  async buscarPlaylist(){
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();
    console.log(this.playlists)
  }

  irParaPlaylist(playlistId: string){
    this.menuSelecionado = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }
}
