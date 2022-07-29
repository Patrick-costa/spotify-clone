export interface Album{
    id: string,
    imagemUrl: string,
    nome: string,
    data?: string,
    uri: string,
    artista?: {
        id: string,
        nome: string
    }
}