import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Directive, ElementRef, OnInit, Renderer2, HostListener } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { LotpanelComponent } from './components/lotpanel/lotpanel.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes:Routes = [
  {path:'', component:HomeComponent},//ссылка и какой компонент отображает
  {path:'userpanel', component:UserpanelComponent},
  {path:'lotpanel', component:LotpanelComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserpanelComponent,
    LotpanelComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes), //какие пути отслеживаются
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
