import { Usuario } from "../models/usuario";




export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): Usuario{
    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: user.images.pop().url
    }
}