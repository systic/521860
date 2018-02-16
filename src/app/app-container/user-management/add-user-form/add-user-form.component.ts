import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';

/** 
 *
 * A form that slides in from the right on the User Management page for
 * adding a new user.
 *
 */
@Component({
	selector: 'add-user-form',
	templateUrl: './add-user-form.component.html',
	styleUrls: [ './add-user-form.component.scss' ]
})
export class AddUserFormComponent implements AfterViewInit {

	@Output() dismiss = new EventEmitter<void>();

	formVisible = false;

	roleOptions = [
		'User',
		'Admin'
	];

	dismissForm() {
		this.formVisible = false;

		setTimeout(() => {
			this.dismiss.emit();
		}, 250);
	}

	onFormSubmit() {

		// Just dismiss form for the time being
		this.dismissForm();
	}

	ngAfterViewInit() {

		setTimeout(() => {
			this.formVisible = true;
		}, 200);
	}


}
