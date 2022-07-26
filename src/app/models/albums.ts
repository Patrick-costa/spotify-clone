export interface Album{
    id: string,
    imagemUrl: string,
    nome: string,
    data?: string,
    artista?: {
        id: string,
        nome: string
    }
}