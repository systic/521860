import { Component, Input } from '@angular/core';

// Interfaces
import {
	Device,
} from '../../../interfaces';

/** 
 * Device Card Component
 *
 * Displays device data for the grid layout in the Device Management page
 *
 */
@Component({
	selector: 'app-device-card',
	templateUrl: './device-card.component.html',
	styleUrls: [ './device-card.component.scss' ]
})
export class DeviceCardComponent {

	@Input() device: Device;
}
