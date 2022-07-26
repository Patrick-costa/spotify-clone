export interface Musica{
    id: string;
    titulo: string,
    artistas: {
        id: string,
        nome: string,
    }[],
    album?: {
        id: string,
        nome: string,
        imagemUrl?: string,
    },
    reproducoes?: string,
    tempo: string,
    tocando?: boolean;
}