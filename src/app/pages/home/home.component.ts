import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Musica } from 'src/app/models/musica';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  musicas: Musica[] = [];

  playIcone = faPlay;
  
  constructor(private spotifyService: SpotifyService
              
    ) { }

  ngOnInit(): void {
    this.obterMusicas();
  }

  async obterMusicas(){
    this.musicas = await this.spotifyService.buscarMusicas();
    console.log(this.musicas);
  }

  obterArtistas(musica: Musica){
    return musica.artistas.map(artistas => artistas.nome).join(', ');
  }

  async executarMusica(musica: Musica){
    await this.spotifyService.executarMusica(musica.id);
  }

}
