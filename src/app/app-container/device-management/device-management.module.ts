import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DeviceManagementRoutingModule } from './device-management-routing.module';

import { DeviceManagementPageComponent } from './device-management-page/device-management-page.component';
import { DeviceCardComponent } from './device-card/device-card.component';
import { AddDeviceFormComponent } from './add-device-form/add-device-form.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		DeviceManagementRoutingModule,
	],
	declarations: [
		DeviceManagementPageComponent,
		DeviceCardComponent,
		AddDeviceFormComponent,
	]
})
export class DeviceManagementModule {
}
