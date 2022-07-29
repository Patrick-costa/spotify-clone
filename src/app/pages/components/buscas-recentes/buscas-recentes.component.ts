import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyTrackPesquisaParaMusica } from 'src/app/Common/spotifyHelper';
import { Musica } from 'src/app/models/musica';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-buscas-recentes',
  templateUrl: './buscas-recentes.component.html',
  styleUrls: ['./buscas-recentes.component.scss']
})
export class BuscasRecentesComponent implements OnInit, OnDestroy {

  pesquisasRecentes = [
    'Top Brasil', 'Top Global', 'Esquenta Sertanejo', 'Funk Hits', 'Pagodeira'
  ]

  campoPesquisa = '';

  @Output()
  musicas: Musica[] = [];

  subs: Subscription[] = [];
  
  constructor(
    private spotifyService: SpotifyService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  definirPesquisa(pesquisa: string){
    this.campoPesquisa = pesquisa;
  }

  buscar(evt: any){
    this.campoPesquisa= evt.srcElement.value;
    this.buscarMusicas();
  }

  buscarMusicas(){
    const sub = this.spotifyService.buscarMusicasPesquisa(this.campoPesquisa).subscribe({
      next: (x) => {
        const obj = Object.values(x);
        let musica = obj.map(x => x.items);
        let array = musica.pop();
        this.musicas = array.map(SpotifyTrackPesquisaParaMusica);
      },
      error: (e) => {
        console.log(e);
      }
    });

    this.subs.push(sub);
  }
}
