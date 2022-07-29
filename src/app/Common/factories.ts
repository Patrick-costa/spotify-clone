import { Album } from "../models/albums";
import { Artista } from "../models/artistas";
import { Musica } from "../models/musica";
import { Playlist } from "../models/playlist";

export function newArtista(): Artista{
    return {
        id: '',
        imagemUrl: '../../assets/images/no_image.png',
        nome: '',
        musicas: [],
    }
}

export function newMusica(): Musica{
    return {
        id: '',
        album: {
            id: '',
            imagemUrl: '../../assets/images/no_image.png',
            nome: '',
        },
        artistas: [],
        tempo: '',
        titulo: '',
        tocando: true,
    }
}

export function newAlbum(): Album{
    return {
        id: '',
        imagemUrl: '../../assets/images/no_image.png',
        nome: '',
        artista: {
            id: '',
            nome: ''
        },
        uri: '',
        data: '',
    }
}


export function newPlaylist(): Playlist{
    return{
        id: '',
        imagemUrl: '../../assets/images/no_image.png',
        nome: '',
        musicas: [],
    }
}