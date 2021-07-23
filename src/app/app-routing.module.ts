import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChooseCombinationComponent } from './choose-combination/choose-combination.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameComponent } from './game/game.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { QuestionComponentComponent } from './question-component/question-component.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', 
  component: DashboardComponent,
  canActivate: [AuthGuard]
  },
  {path: 'login', 
  component: LoginComponent, 
  canActivate: [AuthGuard]
  }, 
  {path: 'welcome', 
  component: WelcomeComponent,
  canActivate: [AuthGuard]
  }, 
  {path: 'main', 
  component: MainComponent, 
  canActivate: [AuthGuard]
  }, 
  {path: 'novaigra', 
  component: ChooseCombinationComponent, 
  canActivate: [AuthGuard]
  }, 
  {path: 'novaigra/pitanja', 
  component: QuestionComponentComponent, 
  canActivate: [AuthGuard]
  }, 
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
