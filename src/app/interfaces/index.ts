/*
 * Interfaces used throughout the application
 */

export interface LatLng {
	lat: number;
	lng: number;
}

/*****************************************************************
 *
 * STORE-RELATED INTERFACES
 *
 */


export interface POSAislesSummary {
	count: number;
	numPerfect: number;
	numGood: number;
	numDown: number;
}

export interface StorePerformancePeriod {
	time: string; 	// i.e. '10:00 AM'
	amount: string; // i.e. '$125,000'
}

export interface StorePerformanceSummary {
	salesNum: string;
	performancePeriods: StorePerformancePeriod[];
}

export interface NetworkPerformanceSummary {
	total: number;
	numConnected: number;
}

export interface StoreSummary {
	name: string;
	status: string;	// i.e. 'active' or 'issue'
	region: string;	// i.e. 'North America'
	country: string; // i.e. 'United States'
	coordinates: LatLng;

	posAisles: POSAislesSummary;
	storePerformance: StorePerformanceSummary;
	networkPerformance: NetworkPerformanceSummary;
}

// The status of all stores at a given hour
export interface HourlyStoreStatusSummary {
	time: string;
	percentActive: number;

	// Note: percent 'issue' is assumed to be 100 - percentActive
}

/*****************************************************************/

export interface DeviceSummary {
	name: string;
	type: string;
	ip: string;
	health: string;
	cpu: number;
	memory: string;
}

// Device data displayed in the Device Management Page
export interface Device {
	name: string;
	storeName: string;
	type: string;
	id: string;
	ip: string;
	os: string;
	status: string;
	description: string;
}

// User data displayed in the User Management page
export interface UserSummary {
	name: string;
	type: string; // expected to be 'user' or 'admin'
	email: string;
	id: string;
	phone: string;
}
