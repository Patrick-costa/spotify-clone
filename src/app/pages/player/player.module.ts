import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { PainelEsquerdoComponent } from "../components/painel-esquerdo/PainelEsquerdoComponent";
import { BotaoMenuComponent } from '../components/botao-menu/botao-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRotas),
  ]
})
export class PlayerModule { }
