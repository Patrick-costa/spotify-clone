import { Artista } from "../models/artistas";
import { Musica } from "../models/musica";
import { Playlist } from "../models/playlist";

export function newArtista(): Artista{
    return {
        id: '',
        imagemUrl: '',
        nome: '',
        musicas: [],
    }
}

export function newMusica(): Musica{
    return {
        id: '',
        album: {
            id: '',
            imagemUrl: '',
            nome: '',
        },
        artistas: [],
        tempo: '',
        titulo: '',
        tocando: true,
    }
}

export function newPlaylist(): Playlist{
    return{
        id: '',
        imagemUrl: '',
        nome: '',
        musicas: [],
    }
}