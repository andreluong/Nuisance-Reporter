import { Routes } from '@angular/router';
import { ReportViewPageComponent } from './report-view-page/report-view-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FeaturesPageComponent } from './features-page/features-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'reports', redirectTo: '', pathMatch: 'full' },
    { path: 'report/:id', component: ReportViewPageComponent },
    { path: 'features', component: FeaturesPageComponent }
];
