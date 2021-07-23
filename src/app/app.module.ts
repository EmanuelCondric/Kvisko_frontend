import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MainComponent } from './main/main.component';
import { SidebarModule } from 'ng-sidebar';
import { MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule } from "@angular/material/icon"
import {MatListModule} from '@angular/material/list'
import { OcCoreModule } from './modules/oc-core/oc-core.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameComponent } from './game/game.component';
import { ChooseCombinationComponent } from './choose-combination/choose-combination.component';
import { QuestionComponentComponent } from './question-component/question-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterUserComponent,
    MainComponent,
    DashboardComponent,
    GameComponent,
    ChooseCombinationComponent,
    QuestionComponentComponent
  ],
  entryComponents: [RegisterUserComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OcCoreModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    MatCardModule, 
    MatDialogModule, 
    SidebarModule, 
    MatSidenavModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
