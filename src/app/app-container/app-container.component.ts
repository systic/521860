import { Component, OnInit } from '@angular/core';

// Services
import { AppService } from '../services/app.service';

@Component({
	templateUrl: './app-container.component.html',
	styleUrls: [ './app-container.component.scss' ]
})
export class AppContainerComponent implements OnInit {

	navMenuVisible: boolean;

	private listenForNavMenuVisibility() {
		this.appService.navMenuVisible$.subscribe((menuVisible: boolean) => {
			this.navMenuVisible = menuVisible;
		});
	}

	constructor(private appService: AppService) {
	}

	ngOnInit() {

		this.listenForNavMenuVisibility();
	}
}
