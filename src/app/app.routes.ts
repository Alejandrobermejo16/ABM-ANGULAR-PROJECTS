import { Routes } from '@angular/router';
import { ScreenMoneyComponent } from '../components/screen-money/screen-money.component';
import {ResumeDesignerComponent} from '../components/resume-designer/resume-designer.component';
import {AppComponent} from '../app/app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'Screen-Money', component: ScreenMoneyComponent },
  { path: 'ResumeDesignerComponent', component: ResumeDesignerComponent },
  { path: '**', redirectTo: '' } 

];
