import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-card-artista',
  templateUrl: './card-artista.component.html',
  styleUrls: ['./card-artista.component.scss']
})
export class CardArtistaComponent implements OnInit {


  @Input()
  nome = '';

  @Input()
  imagemUrl = '';

  
  @Output()
  click = new EventEmitter<void>();
  constructor(

  ) { }

  ngOnInit(): void {

  }

  onClick(){
    this.click.emit();
  }


}
