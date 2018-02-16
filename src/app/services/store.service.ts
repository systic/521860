import { Injectable } from '@angular/core';
import axios from 'axios';

// Interfaces
import { DeviceSummary } from '../interfaces';

@Injectable()
export class StoreService {
	private getDataAtUrl(url: string): Promise<any> {

		return axios.get(url).then(response => {
			return Promise.resolve(response.data);
		}).catch(error => {
			console.error('Error fetching data at url: ' + url);
			console.error(error);
			return Promise.reject(error);
		});
	}

	fetchStoreSummaries() {
		const url = '/assets/json/store-summaries.json';
		return this.getDataAtUrl(url);
	}

	fetchStoreDeviceSummary(): Promise<DeviceSummary[]> {
		const url = '/assets/json/store-device-summary.json';
		return this.getDataAtUrl(url);
	}
}
