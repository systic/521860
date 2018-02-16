import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

@NgModule({

	imports: [
		RouterModule,
	],
	declarations: [
		HeaderComponent,
		NavigationMenuComponent,
	],
	exports: [
		HeaderComponent,
		NavigationMenuComponent,
	],
})
export class CoreModule {

	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if ( parentModule ) {
			throw new Error(
				'CoreModule is already loaded. Import it in the AppModule only');
		}
	}
}
