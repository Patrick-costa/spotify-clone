import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { BotaoMenuComponent } from '../components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RodapeComponent } from '../components/rodape/rodape.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistaComponent } from '../components/top-artista/top-artista.component';
import { PainelDireitoComponent } from '../components/painel-direito/painel-direito.component';
import { BuscasRecentesComponent } from '../components/buscas-recentes/buscas-recentes.component';
import { FormsModule } from '@angular/forms';
import { TopArtistasComponent } from '../components/top-artistas/top-artistas.component';
import { ArtistaItemImagemComponent } from '../components/artista-item-imagem/artista-item-imagem.component';
import { PlayerCardComponent } from '../components/player-card/player-card.component';
import { ListaMusicasComponent } from '../lista-musicas/lista-musicas.component';
import { BannerComponent } from '../components/banner/banner.component';
import { ArtistasComponent } from '../artistas/artistas.component';
import { CardArtistaComponent } from '../components/card-artista/card-artista.component';
import { ListaMusicasArtistaComponent } from '../lista-musicas-artista/lista-musicas-artista.component';
import { PainelEsquerdoComponent } from '../components/painel-esquerdo/painel-esquerdo.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProvider } from 'src/app/interceptors/auth.interceptor';
import { MaterialDesignModule } from '../../share/material-design/material-design.module';
import { FormularioNovaPlaylistComponent } from '../components/formulario-nova-playlist/formulario-nova-playlist.component';
import { PesquisarComponent } from '../pesquisar/pesquisar.component';
import { ListaMusicasAlbumComponent } from '../lista-musicas-album/lista-musicas-album.component';

@NgModule({
  declarations: [
    PlayerComponent,
    BotaoMenuComponent,
    RodapeComponent,
    HomeComponent,
    TopArtistaComponent,
    PainelDireitoComponent,
    BuscasRecentesComponent,
    TopArtistasComponent,
    ArtistaItemImagemComponent,
    PlayerCardComponent,
    ListaMusicasComponent,
    BannerComponent,
    ArtistasComponent,
    CardArtistaComponent,
    ListaMusicasComponent,
    ListaMusicasArtistaComponent,
    PainelEsquerdoComponent,
    FormularioNovaPlaylistComponent,
    PesquisarComponent,
    ListaMusicasAlbumComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialDesignModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas),
  ],
  providers: [AuthInterceptorProvider],
})
export class PlayerModule { }
