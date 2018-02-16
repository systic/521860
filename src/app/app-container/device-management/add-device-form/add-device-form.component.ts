import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';

/**
 *
 * A form that slides in from the right on the Device Management page
 * for adding a new device.
 *
 */
@Component({
	selector: 'add-device-form',
	templateUrl: './add-device-form.component.html',
	styleUrls: [ './add-device-form.component.scss' ]
})
export class AddDeviceFormComponent implements AfterViewInit {

	@Output() dismiss = new EventEmitter<void>();

	formVisible = false;

	deviceTypeOptions = [
		'Type A',
		'Type B',
		'Type C'
	];

	osOptions = [
		'Windows 7',
		'Windows 8',
		'OS X'
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
