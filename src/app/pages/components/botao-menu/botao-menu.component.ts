import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.scss']
})
export class BotaoMenuComponent implements OnInit {


  @Input()
  descricao = '';

  @Input()
  selecionado = false;
  

  @Output()
  click = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
 
  }

  onClick(){
    this.click.emit();
  }


}
