
import {UserService, User} from './services/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Directive, ElementRef, OnInit, Renderer2, HostListener } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserpanelComponent } from './components/userpanel/userpanel.component';
import { LotpanelComponent } from './components/lotpanel/lotpanel.component';
import { RegisterComponent } from './components/register/register.component';
import { ClickOutsideDirective } from './directives/clickOutside/click-outside.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LotManagementComponent } from './components/lot-management/lot-management.component';

const appRoutes:Routes = [
  {path:'', component:HomeComponent},//ссылка и какой компонент отображает
  {path:'userpanel', component:UserpanelComponent},
  {path:'lotpanel', component:LotpanelComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileComponent},
  {path:'manage-lotpanel', component:LotManagementComponent},
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserpanelComponent,
    LotpanelComponent,
    RegisterComponent,
    ClickOutsideDirective,
    NotFoundComponent,
    ProfileComponent,
    LotManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes), //какие пути отслеживаются
    HttpClientModule,
    ReactiveFormsModule,
	   BrowserAnimationsModule,
	    ToastrModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
