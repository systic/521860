import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UserManagementRoutingModule } from './user-management-routing.module';

import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import { UserCardComponent } from './user-card/user-card.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		UserManagementRoutingModule,
	],
	declarations: [
		UserManagementPageComponent,
		UserCardComponent,
		AddUserFormComponent,
	]
})
export class UserManagementModule {
}
