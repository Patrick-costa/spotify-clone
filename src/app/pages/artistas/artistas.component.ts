import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  meusArtistas: any = [];
  idAlbum = '';

  ngOnInit(): void {
    this.buscarArtistasUsuario();
  }

  async buscarArtistasUsuario(){
    const artistaUsuario = await this.spotifyService.obterArtistasUsuario();
    this.meusArtistas = artistaUsuario;
  }

  async obterAlbunsArtista(id: string){
    const albuns = await this.spotifyService.obterAlbunsArtista(id);
    this.idAlbum = albuns[0].id;
  }


  acessarArtista(id: string){
    this.obterAlbunsArtista(id);
    setTimeout(() => {   
      this.router.navigateByUrl('player/artista-playlist/'+id+'/'+this.idAlbum);
    }, 500);
  }

}
