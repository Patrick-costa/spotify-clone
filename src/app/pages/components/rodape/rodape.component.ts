import { Component, OnInit } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/models/usuario';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.scss']
})
export class RodapeComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  logoutIcone = faSignOut;

  usuario: Usuario = null ;

  ngOnInit(): void {
    this.usuario = this.spotifyService.usuario;
  }

  logout(){
    this.spotifyService.logout();
  }

}
