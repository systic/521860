import { Component, OnInit } from '@angular/core';

// Services
import { AppService } from '../../services/app.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

	userFullName = 'Bunga Jelitha';
	numNotifications = 2;

	pageTitle = 'Dashboard';
	companyPlaceholderName = 'Placeholder';

	navMenuVisible: boolean;

	private listenForNavMenuVisibility() {

		this.appService.navMenuVisible$.subscribe((menuVisible: boolean) => {
			this.navMenuVisible = menuVisible;
		});
	}

	constructor(private appService: AppService) { }

	toggleNavMenuVisibility() {
		this.navMenuVisible = !this.navMenuVisible;
		if ( this.navMenuVisible ) {
			this.appService.showNavMenu();
		} else {
			this.appService.hideNavMenu();
		}
	}

	ngOnInit() {
		this.listenForNavMenuVisibility();
	}
}
