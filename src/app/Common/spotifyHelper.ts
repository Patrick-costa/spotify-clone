import { addMilliseconds, format } from "date-fns";
import { Album } from "../models/albums";
import { Artista } from "../models/artistas";
import { Musica } from "../models/musica";
import { Playlist } from "../models/playlist";
import { Usuario } from "../models/usuario";
import { newMusica, newPlaylist } from "./factories";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): Usuario{
    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images.pop().url
    }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): Playlist{
    let image = '';
    if(playlist.images.length != 0){
        image = playlist.images.shift().url;
    }

    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: image,
    }
}

export function SpotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull): Artista{
    return {
        id: spotifyArtista.id,
        imagemUrl: spotifyArtista.images.sort((a,b) => a.width - b.width).pop().url,
        nome: spotifyArtista.name
    }
}

export function SpotifyTrackParaMusica(spotifyTrack: SpotifyApi.TrackObjectFull, status: boolean): Musica{
    
    if(!spotifyTrack){
        return newMusica();
    }

    const msParaMinutos = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms);
        return format(data, 'mm:ss');
    }

    return {
        id: spotifyTrack.uri,
        titulo: spotifyTrack.name,
        album: {
            id: spotifyTrack.id,
            imagemUrl: spotifyTrack.album.images.shift().url,
            nome: spotifyTrack.album.name,
        },
        artistas: spotifyTrack.artists.map(artista => ({
            id: artista.id,
            nome: artista.name,
        })),
        tempo: msParaMinutos(spotifyTrack.duration_ms),
        tocando: status,
    }
}

export function SpotifyAlbumParaAlbum(album: SpotifyApi.AlbumObjectSimplified): Album{
    return {
        id: album.id,
        imagemUrl: album.images.shift().url,
        nome: album.name,
    }
}

export function SpotifyMusicaAlbumParaMusicaAlbum(musica: SpotifyApi.TrackObjectSimplified, album: Album): Musica{

    const msParaMinutos = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms);
        return format(data, 'mm:ss');
    }

    return{
        id: musica.uri,
        artistas: musica.artists.map(artista => ({
            id: artista.id,
            nome: artista.name,
        })),
        titulo: musica.name,
        tempo: msParaMinutos(musica.duration_ms),
        album: album,
    }
}

export function SpotifySinglePlaylistParaPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): Playlist{
    let image = '';
    if(playlist.images.length != 0){
        image = playlist.images.shift().url;
    }

    if(!playlist){
        return newPlaylist();
    }
    return{
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: image,
        musicas: [],
    }
}