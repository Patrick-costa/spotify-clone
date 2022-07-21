import { Playlist } from "../models/playlist";
import { Usuario } from "../models/usuario";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): Usuario{
    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images.pop().url
    }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): Playlist{
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: playlist.images.pop().url
    }
}