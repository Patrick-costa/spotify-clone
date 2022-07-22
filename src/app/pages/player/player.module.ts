import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { PainelEsquerdoComponent } from "../components/painel-esquerdo/PainelEsquerdoComponent";
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


@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
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
    BannerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas),
  ]
})
export class PlayerModule { }
