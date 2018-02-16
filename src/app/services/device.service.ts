import { Injectable } from '@angular/core';
import axios from 'axios';

// Interfaces
import {
	Device,
} from '../interfaces';

@Injectable()
export class DeviceService {

	private getDataAtUrl(url: string): Promise<any> {
		return axios.get(url).then(response => {
			return Promise.resolve(response.data);
		}).catch(error => {
			console.error('Error fetching data at url: ' + url);
			console.error(error);
			return Promise.reject(error);
		});
	}

	fetchDevices(): Promise<Device[]> {
		const url = '/assets/json/devices.json';
		return this.getDataAtUrl(url);
	}
}
