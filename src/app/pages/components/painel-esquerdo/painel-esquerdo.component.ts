import { Component, Injectable, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAdd, faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Playlist } from 'src/app/models/playlist';
import { SpotifyService } from 'src/app/services/spotify.service';
import {MatDialog} from '@angular/material/dialog';
import { FormularioNovaPlaylistComponent } from '../formulario-nova-playlist/formulario-nova-playlist.component';
import { BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})


export class PainelEsquerdoComponent implements OnInit {

  playlists: Playlist[] = [];

  constructor(private spotifyService: SpotifyService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,) {
               }

  @Input()
  menuSelecionado: string;

  teste: Playlist[] = [];
  timerId: any = null;
  
  //variaveis de icones
  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playlistIcone = faMusic;
  addIcone = faAdd;

  ngOnInit(): void {
    setTimeout(() => {
      this.buscarPlaylist();
    }, 200);
    console.log(this.activatedRoute.component.name);
  }

  openDialog() {
    this.dialog.open(FormularioNovaPlaylistComponent, {
      width: '30%',
      height: '45%',
      disableClose: false,
    });
  }

  botaoClick(botao: string){
    this.menuSelecionado = botao;
    if(botao === 'Artistas'){
      this.router.navigateByUrl(`player/artistas`);
    } else if(botao === 'Pesquisar'){
      this.router.navigateByUrl(`player/pesquisar`);
    } else
    this.router.navigateByUrl('player/home')
  }

  async buscarPlaylist(){
    clearTimeout(this.timerId);
    const playlist = await this.spotifyService.buscarPlaylistUsuario();
    this.playlists = playlist;
    this.timerId = setInterval(async () => {
      await this.buscarPlaylist();
    }, 3000);

  }

  irParaPlaylist(playlistId: string){
    this.menuSelecionado = playlistId;
    console.log('opcao', this.menuSelecionado);
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }
}

