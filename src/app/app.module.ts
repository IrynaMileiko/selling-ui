
import { UserService, User } from './services/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Directive, ElementRef, OnInit, Renderer2, HostListener } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AboutComponent } from './components/about/about.component';
import { BuyComponent } from './components/buy/buy.component';
import { SellComponent } from './components/sell/sell.component';
import { LotEditComponent } from './components/lot-edit/lot-edit.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthInterceptorService } from './services/interceptor/auth-interceptor.service';
import {MessageCenterService} from "./services/message_center/message-center.service";
const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },//ссылка и какой компонент отображает
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'userpanel', component: UserpanelComponent, pathMatch: 'full' },
  { path: 'lotpanel', component: LotpanelComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'buy', component: BuyComponent, pathMatch: 'full' },
  { path: 'sell', component: SellComponent, pathMatch: 'full' },
  { path: 'manage-lotpanel', component: LotManagementComponent, pathMatch: 'full' },
  { path: 'editlot/:id', component: LotEditComponent },
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
    LotManagementComponent,
    AboutComponent,
    BuyComponent,
    SellComponent,
    LotEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes), //какие пути отслеживаются
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatTabsModule
  ],
  providers: [UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
