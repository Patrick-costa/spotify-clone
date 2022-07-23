import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  @Input()
  menuSelecionado: string;

  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playlistIcone = faMusic;

  ngOnInit(): void {
    setTimeout(() => {
      this.buscarPlaylist();
    }, 200);
    console.log(this.activatedRoute.component.name);
  }

  botaoClick(botao: string){
    this.menuSelecionado = botao;
    if(botao === 'Artistas'){
      this.router.navigateByUrl(`player/artistas`);
    } else
    this.router.navigateByUrl('player/home')
  }

  async buscarPlaylist(){
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();
  }

  irParaPlaylist(playlistId: string){
    this.menuSelecionado = playlistId;
    console.log('opcao', this.menuSelecionado);
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }
}
