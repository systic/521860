import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
	imports: [
		SharedModule,
	],
	declarations: [
		LoginPageComponent,
	],
	exports: [
	]
})
export class LoginModule {
}
