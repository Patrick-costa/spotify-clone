import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artista } from 'src/app/models/artistas';

import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  meusArtistas: any = [];
  idAlbum = '';
  rota: any;
  uri: string;

  ngOnInit(): void {
    this.buscarArtistasUsuario();
    this.rota = (this.activatedRoute.component.name).toString
  }

  async buscarArtistasUsuario(){
    const artistaUsuario = await this.spotifyService.obterArtistasUsuario();
    this.meusArtistas = artistaUsuario;
  }

  async obterAlbunsArtista(id: string){
    const albuns = await this.spotifyService.obterAlbunsArtista(id);
    this.idAlbum = albuns[0].id;
    this.uri = albuns[0].uri;
  }

  async executarPlaylist(){
   await this.spotifyService.executarPlaylist(this.uri);
  }

  acessarArtista(id: string){
    this.obterAlbunsArtista(id);
    setTimeout(() => {   
      this.executarPlaylist();
      this.router.navigateByUrl('player/artista-playlist/'+id+'/'+this.idAlbum);
    }, 500);
  }

}
