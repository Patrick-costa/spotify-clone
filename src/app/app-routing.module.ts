import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticadoGuard } from './guards/autenticado.guard';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'player/home' ,
    pathMatch: 'full',
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
    canLoad: [AutenticadoGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
