import { Component, OnInit } from '@angular/core';
import { Artista } from 'src/app/models/artistas';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artistas',
  templateUrl: './top-artistas.component.html',
  styleUrls: ['./top-artistas.component.scss']
})
export class TopArtistasComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  artistas: Artista[] = [];

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas(){
    this.artistas = await this.spotifyService.buscarTopArtistas(5);
  }
  

}
