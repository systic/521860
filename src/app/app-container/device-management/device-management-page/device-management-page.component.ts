import { Component, OnInit } from '@angular/core';

// Interfaces
import {
	Device,
} from '../../../interfaces';

// Services
import { DeviceService } from '../../../services/device.service';

/*
 * Device Management Page
 */
@Component({
	templateUrl: './device-management-page.component.html',
	styleUrls: [ './device-management-page.component.scss' ]
})
export class DeviceManagementPageComponent implements OnInit {

	gridLayout = true;

	allDevices: Device[] = [];
	displayedDevices: Device[] = [];

	numPages = 0;
	currentPage = 0;
	itemsPerPage = 12;

	addDeviceFormVisible = false;

	sortAscend = {
		deviceName: true,
		storeName: true,
		storeId: true,
		os: true
	};

	private fetchDevices() {
		console.log('hello?');
		this.deviceService.fetchDevices().then((devices: Device[]) => {

			console.log('DEVICES');
			console.log(devices);
			this.allDevices = devices;
			this.displayedDevices = this.allDevices.slice(0, this.itemsPerPage);

			const numDevices = devices.length;
			this.numPages = Math.floor( numDevices / this.itemsPerPage ) +
				( numDevices % this.itemsPerPage === 0 ? 0 : 1 );

			console.log('num pages: ' + this.numPages);
		});
	}

	private updateDisplayedDevices() {
		const startIndex = this.currentPage * this.itemsPerPage;
		this.displayedDevices = this.allDevices.slice(startIndex, startIndex + this.itemsPerPage);
	}

	constructor(private deviceService: DeviceService) { }


	onNewPageSelected(pageIndex: number) {
		this.currentPage = pageIndex;
		this.updateDisplayedDevices();
	}

	sortByDeviceName() {

		const ascend = this.sortAscend.deviceName;
		this.allDevices.sort((a, b) => {
			if ( ascend ) {
				return a.name < b.name ? -1 : 1;
			}

			return a.name < b.name ? 1 : -1;
		});

		this.updateDisplayedDevices();
		this.sortAscend.deviceName = !this.sortAscend.deviceName;
	}

	sortByStoreName() {

		const ascend = this.sortAscend.storeName;
		this.allDevices.sort((a, b) => {
			if ( ascend ) {
				return a.storeName < b.storeName ? -1 : 1;
			}

			return a.storeName < b.storeName ? 1 : -1;
		});

		this.updateDisplayedDevices();
		this.sortAscend.storeName = !this.sortAscend.storeName;
	}

	sortByStoreId() {
		const ascend = this.sortAscend.storeId;
		this.allDevices.sort((a, b) => {
			if ( ascend ) {
				return a.id < b.id ? -1 : 1;
			}
			
			return a.id < b.id ? 1 : -1;
		});
		
		this.updateDisplayedDevices();
		this.sortAscend.storeId = !this.sortAscend.storeId;
	}

	sortByOS() {
		console.log('hellooooo');
		const ascend = this.sortAscend.os;
		this.allDevices.sort((a, b) => {
			if ( ascend ) {
				return a.os < b.os ? -1 : 1;
			}

			return a.os < b.os ? 1 : -1;
		});
		this.updateDisplayedDevices();
		this.sortAscend.os = !this.sortAscend.os;
	}

	ngOnInit() {
		this.fetchDevices();
	}
}
