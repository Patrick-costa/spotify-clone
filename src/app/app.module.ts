import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BuscasRecentesComponent } from './pages/components/buscas-recentes/buscas-recentes.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './share/material-design/material-design.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialDesignModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [AuthInterceptorProvider],
})
export class AppModule { }
