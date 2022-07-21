import { Artista } from "../models/artistas";
import { Musica } from "../models/musica";

export function newArtista(): Artista{
    return {
        id: '',
        imagemUrl: '',
        nome: '',
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