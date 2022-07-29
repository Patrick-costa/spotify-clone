import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NovaPlaylist } from 'src/app/models/novaPlaylist';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-nova-playlist',
  templateUrl: './formulario-nova-playlist.component.html',
  styleUrls: ['./formulario-nova-playlist.component.scss']
})
export class FormularioNovaPlaylistComponent implements OnInit {

  constructor(private http: HttpClient,
    private matDialog: MatDialog
  ) { }

  nome: string;
  descricao: string;
  novaPlaylist: NovaPlaylist;
  idUsuario = localStorage.getItem('id');
  ngOnInit(): void {

  }


  criarPlaylist() {

    this.novaPlaylist = {
      name: this.nome,
      description: this.descricao,
      public: true
    }

    this.http.post(`https://api.spotify.com/v1/users/${this.idUsuario}/playlists`, this.novaPlaylist).subscribe({
      next: (resposta) => {
        this.matDialog.closeAll();
        this.alertaSwal();
      },
      error: (e) => {
        console.log(e)
      }
    })



  }


  alertaSwal() {
    swal.fire({
      icon: 'success',
      title: 'Playlist criada com sucesso!',
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#37AB00',
    }).then((result) => {

      if (result.isConfirmed) {
       
      }
    })
  }

}

