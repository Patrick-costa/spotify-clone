import { Component, Input, OnInit } from '@angular/core';
import { newArtista } from 'src/app/Common/factories';
import { Artista } from 'src/app/models/artistas';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss']
})
export class TopArtistaComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  topArtista: Artista = newArtista();

  imagemUrl = '';

  text = '';

  ngOnInit(): void {
    this.buscarArtista();
  }

  async buscarArtista(){
    const artistas = await this.spotifyService.buscarTopArtistas(1);
    
    if(!!artistas){
      this.topArtista = artistas.pop();
    }
    this.imagemUrl = this.topArtista.imagemUrl;
    this.text = this.topArtista.nome;
  }

}
