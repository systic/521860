import { Component } from '@angular/core';

// Services
import { AppService } from '../../services/app.service';

/**
 * Navigation Menu Component
 *
 * Navigation menu for mobile and tablet devices
 *
 */
@Component({
	selector: 'app-navigation-menu',
	templateUrl: './navigation-menu.component.html',
	styleUrls: [ './navigation-menu.component.scss' ]
})
export class NavigationMenuComponent {

	companyPlaceholder = 'Placeholder';

	constructor(private appService: AppService) { }

	dismissNavMenu() {
		this.appService.hideNavMenu();
	}
}
