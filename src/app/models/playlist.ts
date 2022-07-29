import { Musica } from "./musica";

export interface Playlist{
    id: string,
    nome: string,
    uri?: string,
    descricao?: string,
    imagemUrl?: string,
    musicas?: Musica[]
    dono?: {
        nome: string,
        id: string,
    }
}