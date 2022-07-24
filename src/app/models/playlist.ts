import { Musica } from "./musica";

export interface Playlist{
    id: string,
    nome: string,
    imagemUrl?: string,
    musicas?: Musica[]
}