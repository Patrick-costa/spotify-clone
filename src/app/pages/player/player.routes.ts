import { Routes } from "@angular/router";
import { AutenticadoGuard } from "src/app/guards/autenticado.guard";
import { ArtistasComponent } from "../artistas/artistas.component";
import { HomeComponent } from "../home/home.component";
import { ListaMusicasAlbumComponent } from "../lista-musicas-album/lista-musicas-album.component";
import { ListaMusicasArtistaComponent } from "../lista-musicas-artista/lista-musicas-artista.component";
import { ListaMusicasComponent } from "../lista-musicas/lista-musicas.component";
import { PesquisarComponent } from "../pesquisar/pesquisar.component";
import { PlayerComponent } from "./player.component";

export const PlayerRotas: Routes = [
    {
        path: '',
        component: PlayerComponent,

        children: [
            {
                path: 'home',
                component: HomeComponent,
                canLoad: [AutenticadoGuard]
            },
            {
                path: 'lista/:tipo/:id',
                component: ListaMusicasComponent
            },
            {
                path: 'artistas',
                component: ArtistasComponent
            },
            {
                path: 'artista-playlist/:idArtista/:idPlaylist',
                component: ListaMusicasArtistaComponent
            },
            {
                path: 'album/:idAlbum',
                component: ListaMusicasAlbumComponent
            },
            {
                path: 'pesquisar',
                component: PesquisarComponent
            }
        ]
    }
]