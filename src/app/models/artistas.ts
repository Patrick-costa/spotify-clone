import { Musica } from "./musica";

export interface Artista{
    id: string,
    nome: string,
    imagemUrl: string,
    musicas?: Musica[],
}