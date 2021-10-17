import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { LotpanelComponent } from './components/lotpanel/lotpanel.component';

const appRoutes:Routes = [
  {path:'', component:HomeComponent},//ссылка и какой компонент отображает
  {path:'userpanel', component:UserpanelComponent},
  {path:'lotpanel', component:LotpanelComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserpanelComponent,
    LotpanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes) //какие пути отслеживаются
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
