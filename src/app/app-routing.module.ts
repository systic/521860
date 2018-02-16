import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppContainerComponent } from './app-container/app-container.component';
import { LoginPageComponent } from './login/login-page/login-page.component';

const routes: Routes = [
	{ path: 'login', component: LoginPageComponent },
	{
		path: '',
		component: AppContainerComponent,
		children: [
			{ path: 'dashboard', loadChildren: './app-container/dashboard/dashboard.module#DashboardModule' },
			{ path: 'device-management', loadChildren: './app-container/device-management/device-management.module#DeviceManagementModule' },
			{ path: 'user-management', loadChildren: './app-container/user-management/user-management.module#UserManagementModule' },
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
		]
	},
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {
}
