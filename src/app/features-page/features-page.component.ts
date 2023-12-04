import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-features-page',
    standalone: true,
    templateUrl: './features-page.component.html',
    imports: [CommonModule, NavBarComponent]
})
export class FeaturesPageComponent {

}
