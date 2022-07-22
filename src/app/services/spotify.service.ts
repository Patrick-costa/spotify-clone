import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { Usuario } from '../models/usuario';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifySinglePlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../Common/spotifyHelper';
import { Playlist } from '../models/playlist';
import { Router } from '@angular/router';
import { Artista } from '../models/artistas';
import { Musica } from '../models/musica';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  spotifyApi: Spotify.SpotifyWebApiJs;
  usuario: Usuario;
  id: string;
  constructor(private router: Router) { 
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario() {
    if(!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false;

    try {

      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;

    }catch(ex){
      return false;
    }
  }

  async obterSpotifyUsuario(){
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin(){
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType; 
  }

  obterTokenUrlCallback(){
    if(!window.location.hash){
      return '';
    }

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<Playlist[]>{
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit });
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarTopArtistas(limit = 10): Promise<Artista[]>{
    const artistas = await this.spotifyApi.getMyTopArtists({ limit });
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit=50): Promise<Musica[]>{
    const musicas = await this.spotifyApi.getMySavedTracks({ offset, limit});
    console.log(musicas);
    const tocando = true;
    return musicas.items.map(x => SpotifyTrackParaMusica(x.track, true));
  }

  async executarMusica(musicaId: string){
    await this.spotifyApi.queue(musicaId);
    this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<Musica>{
    const musicaSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    const pausado = musicaSpotify.is_playing;

    console.log(musicaSpotify);
    return SpotifyTrackParaMusica(musicaSpotify.item,pausado);
  }

  
  async voltarMusica(){
   await this.spotifyApi.skipToPrevious()
  }

  async proximaMusica(){
    await this.spotifyApi.skipToNext();
  }

  async pausarMusica(){
    await this.spotifyApi.pause();
  }

  async playMusica(){
    await this.spotifyApi.play();
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50){
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);
    if(!playlistSpotify){
      return null;
    }

    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify);
    const tocando = true;
    const musicasSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, {offset, limit})
    playlist.musicas = musicasSpotify.items.map(musica => SpotifyTrackParaMusica(musica.track as SpotifyApi.TrackObjectFull, tocando))
    
    return playlist;
  }

  logout(){
    localStorage.clear;
    this.router.navigate(['/login'])
  }
}
