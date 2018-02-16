import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

/**
 * App Service
 *
 * A service for perfoming top-level actions for the application
 *
 */
@Injectable()
export class AppService {

	private navMenuVisibleSource = new Subject<boolean>();

	navMenuVisible$ = this.navMenuVisibleSource.asObservable();

	showNavMenu() {
		this.navMenuVisibleSource.next(true);
	}

	hideNavMenu() {
		this.navMenuVisibleSource.next(false);
	}
}
