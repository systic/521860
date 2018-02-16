import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceManagementPageComponent } from './device-management-page/device-management-page.component';

const routes: Routes = [
	{ path: '', component: DeviceManagementPageComponent },
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class DeviceManagementRoutingModule {
}
