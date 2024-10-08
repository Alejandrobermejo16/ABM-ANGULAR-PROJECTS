import { Routes } from '@angular/router';
import { ScreenMoneyComponent } from '../components/screen-money/screen-money.component';
import {ResumeDesignerComponent} from '../components/resume-designer/resume-designer.component';
import {CvFormComponent} from '../components/cv-form/cv-form.component';

export const routes: Routes = [
  { path: 'Screen-Money', component: ScreenMoneyComponent },
  { path: 'ResumeDesignerComponent', component: ResumeDesignerComponent },
  { path: 'CvFormComponent', component: CvFormComponent },
];
