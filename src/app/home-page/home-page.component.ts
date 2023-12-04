import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { ReportListComponent } from '../report-list/report-list.component';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    imports: [CommonModule, MapComponent, ReportListComponent, NavBarComponent]
})
export class HomePageComponent {}