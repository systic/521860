import { Injectable } from '@angular/core';
import axios from 'axios';

// Interfaces
import {
	UserSummary,
} from '../interfaces';

@Injectable()
export class UserService {

	private getDataAtUrl(url: string): Promise<any> {

		return axios.get(url).then(response => {
			return Promise.resolve(response.data);
		}).catch(error => {
			console.error('Error fetching data at url: ' + url);
			console.error(error);
			return Promise.reject(error);
		});
	}

	fetchUsers(): Promise<UserSummary[]> {
		const url = '/assets/json/user.json';
		return this.getDataAtUrl(url);
	}
}
