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


@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeComponent,
    HomeComponent,
    TopArtistaComponent,
    PainelDireitoComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRotas),
  ]
})
export class PlayerModule { }
