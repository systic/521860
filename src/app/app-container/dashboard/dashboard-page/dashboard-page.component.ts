import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { MapsAPILoader } from '@agm/core';

declare var google;

// Interfaces
import {
	StoreSummary,
	DeviceSummary,
	HourlyStoreStatusSummary,
} from '../../../interfaces';

// Services
import { StoreService } from '../../../services/store.service';

@Component({
	templateUrl: './dashboard-page.component.html',
	styleUrls: [ './dashboard-page.component.scss' ]
})
export class DashboardPageComponent implements OnInit {

	activeMarkerIndex = -1;
	mapZoom = 8;
	mapPosition = {
		lat: 51.678418,
		lng: 7.809007
	};
	latLngBounds: any;


	selectedRegion = 'North America';
	selectedStore: StoreSummary;
	selectedStoreDeviceSummaries: DeviceSummary[] = [];

	mapRegionDropdownVisible = false;
	mobileSummarySectionVisible = false;
	mobileStoreDetailsVisible = false;
	deviceSummaryModalVisible = false;

	// Flags that control visibiltity of store map markers
	showOnlyActiveStores = false;
	showOnlyIssueStores = false;

	hourlyStoreStatuses: HourlyStoreStatusSummary[] = [];
	storeSummaries: StoreSummary[] = [];
	displayedStoreSummaries: StoreSummary[] = [];

	numStoresForSelectedRegion = 0;
	numActiveStoresForSelectedRegion = 0;
	numIssueStoresForSelectedRegion = 0;
	percentStoresActiveForSelectedRegion = 0;
	percentStoresIssueForSelectedRegion = 0;

	statusCountsByRegion = {
		northAmerica: { active: 0, issue: 0 },
		canada: { active: 0, issue: 0 },
		unitedStates: { active: 0, issue: 0 },
		mexico: { active: 0, issue: 0 },
		cuba: { active: 0, issue: 0 },
		guatemala: { active: 0, issue: 0 },
		honduras: { active: 0, issue: 0 },
	}

	mapStyles: any[] = [
		{ elementType: 'labels.text.fill', stylers: [{ color: '#746855' }]}
	];


	statusHistoryCarouselOptions = {
		grid: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1, all: 0 },
		slide: 1,
		point: {
			visible: true,
			pointStyles: `
				.ngxcarouselPoint {
					margin-top: 8px;
					list-style-type: none;
					text-align: center;
					width: 100%;
				}

				.ngxcarouselPoint li {
					display: inline-block;
					width: 6px;
					height: 6px;
					border-radius: 3px;
					background-color: #e4e4e4;
					margin-right: 5px;
					cursor: pointer;
				}

				.ngxcarouselPoint li:last-of-type {
					margin-right: 0;
				}

				.ngxcarouselPoint li.active {
					background-color: #00a2e0;
				}
			`
		},
		touch: true,
	};

	private fetchStoreSummaries() {
		this.storeService.fetchStoreSummaries().then(response => {
			this.hourlyStoreStatuses = response.hourlyStoreStatuses;
			this.storeSummaries = response.stores;
			this.displayedStoreSummaries = this.storeSummaries;

			this.initStatusCountsByRegion();
			this.setNumStoresForSelectedRegion('North America');

			this.setMapBoundsForVisibleMarkers();
		});
	}

	private initStatusCountsByRegion() {

		const statusCounts = this.statusCountsByRegion;


		statusCounts.northAmerica.active = this.numStoresInRegionWithStatus('North America', 'active');
		statusCounts.northAmerica.issue = this.numStoresInRegionWithStatus('North America', 'issue');

		statusCounts.canada.active = this.numStoresInRegionWithStatus('Canada', 'active');
		statusCounts.canada.issue = this.numStoresInRegionWithStatus('Canada', 'issue');

		statusCounts.unitedStates.active = this.numStoresInRegionWithStatus('United States', 'active');
		statusCounts.unitedStates.issue = this.numStoresInRegionWithStatus('United States', 'issue');

		statusCounts.mexico.active = this.numStoresInRegionWithStatus('Mexico', 'active');
		statusCounts.mexico.issue = this.numStoresInRegionWithStatus('Mexico', 'issue');

		statusCounts.cuba.active = this.numStoresInRegionWithStatus('Cuba', 'active');
		statusCounts.cuba.issue = this.numStoresInRegionWithStatus('Cuba', 'issue');

		statusCounts.guatemala.active = this.numStoresInRegionWithStatus('Guatemala', 'active');
		statusCounts.guatemala.issue = this.numStoresInRegionWithStatus('Guatemala', 'issue');

		statusCounts.honduras.active = this.numStoresInRegionWithStatus('Honduras', 'active');
		statusCounts.honduras.issue = this.numStoresInRegionWithStatus('Honduras', 'issue');
	}

	// Returns  the number of stores in `region` with a status of `status`.
	// Example regions: 'North America', 'Canada'
	// Expected status values: 'active' or 'issue'
	private numStoresInRegionWithStatus(region: string, status: string): number {

		let summaries: StoreSummary[];
		if ( region === 'North America' ) {
			// If region is 'North America', then include *all* stores
			summaries = this.storeSummaries;
		} else {
			// `region` is a country like 'Canada' or 'United States'
			// Filter out stores not in that country.
			summaries = this.storeSummaries.filter((store: StoreSummary) => {
				return store.country === region;
			});
		}

		return summaries.reduce((total, store) => {
			return total + ( store.status === status ? 1 : 0 );
		}, 0);
	}

	private setNumStoresForSelectedRegion(region: string) {
		let stores: StoreSummary[];
		if ( region === 'North America' ) {
			// All stores included
			stores = this.storeSummaries;
		}
		else {
			stores = this.storeSummaries.filter((store: StoreSummary) => {
				return store.country === region;
			});
		}

		this.numStoresForSelectedRegion = stores.length;

		// Update the number of active/issue stores
		//
		this.numActiveStoresForSelectedRegion = stores.reduce((total, store) => {
			return total + ( store.status === 'active' ? 1 : 0 );
		}, 0);

		this.numIssueStoresForSelectedRegion = this.numStoresForSelectedRegion - this.numActiveStoresForSelectedRegion;

		this.percentStoresActiveForSelectedRegion =
			parseFloat((100 * ( this.numActiveStoresForSelectedRegion / this.numStoresForSelectedRegion )).toFixed(1));
		this.percentStoresIssueForSelectedRegion =
			parseFloat((100 - this.percentStoresActiveForSelectedRegion).toFixed(1));
	}

	private setMapBoundsForVisibleMarkers() {
		this.mapsAPILoader.load().then(() => {
			this.latLngBounds = new window['google'].maps.LatLngBounds();
			this.displayedStoreSummaries.forEach((store: StoreSummary) => {
				this.latLngBounds.extend(new window['google'].maps.LatLng(store.coordinates.lat, store.coordinates.lng));
			});

			// Extend bounds if only one marker
			if ( this.displayedStoreSummaries.length === 1 ) {
				const extendPoint1 =
					new window['google'].maps.LatLng(this.latLngBounds.getNorthEast().lat() + 1, this.latLngBounds.getNorthEast().lng() + 1);
				const extendPoint2 = new window['google'].maps.LatLng(this.latLngBounds.getNorthEast().lat() - 1, this.latLngBounds.getNorthEast().lng() - 1);
				this.latLngBounds.extend(extendPoint1);
				this.latLngBounds.extend(extendPoint2);
			}
		});
	}

	// Called after user clicks one of the store status filter buttons over the map.
	// Updates the array of displayed stores to match the filter settings
	filterDisplayedStoreSummaries() {
		console.log('FILTER STORES');

		// Filter by store status
		if ( this.showOnlyActiveStores ) {
			this.displayedStoreSummaries = this.storeSummaries.filter((store: StoreSummary) => {
				return store.status === 'active';
			});
		} else if ( this.showOnlyIssueStores ) {
			this.displayedStoreSummaries = this.storeSummaries.filter((store: StoreSummary) => {
				return store.status === 'issue';
			});
		} else {
			this.displayedStoreSummaries = this.storeSummaries;
		}

		// Filter by region/country if necessary
		this.displayedStoreSummaries = this.displayedStoreSummaries.filter((store: StoreSummary) => {
			return this.selectedRegion === store.country ||
				// Always display if region is 'North America'
				this.selectedRegion === 'North America';
		});

	}

	constructor(private storeService: StoreService,
		private mapsAPILoader: MapsAPILoader) { }

	toggleRegionsDropdown() {
		this.mapRegionDropdownVisible = !this.mapRegionDropdownVisible;
	}

	filterActiveStoresBtnClick() {
		this.showOnlyActiveStores = !this.showOnlyActiveStores;
		if ( this.showOnlyActiveStores ) {
			this.showOnlyIssueStores = false;
		}

		this.filterDisplayedStoreSummaries();
	}

	filterIssueStoresBtnClick() {
		this.showOnlyIssueStores = !this.showOnlyIssueStores;
		if ( this.showOnlyIssueStores ) {
			this.showOnlyActiveStores = false;
		}

		this.filterDisplayedStoreSummaries();
	}

	// Called when user selects a region ( like 'Canada', 'Mexico' ) from the
	// region selector dropdown
	onMapRegionSelected(region: string) {

		this.selectedRegion = region;
		this.mapRegionDropdownVisible = false;

		// Deselect selected store, if any.
		this.selectedStore = null;


		this.filterDisplayedStoreSummaries();
		this.setNumStoresForSelectedRegion(region);

		this.setMapBoundsForVisibleMarkers();
	}


	onStatusHistoryCarouselLoad(event: Event) {
		console.log('CAROUSEL LOAD:');
		console.log(event);
	}

	onViewHandleClick() {

		if ( this.selectedStore ) {
			this.mobileStoreDetailsVisible  = true;
		} else {
			this.mobileSummarySectionVisible = true;
		}
	}

	dismissSummarySection() {
		this.mobileSummarySectionVisible = false;
	}

	onMarkerMouseOver(store: StoreSummary, index: number) {
		this.infowindowData.storeIndex = index;
		this.infowindowData.storeData = store;
	}

	onMarkerMouseOut(store: StoreSummary, index: number) {
		this.infowindowData.storeIndex = -1;
	}

	onMarkerClick(store: StoreSummary, index: number) {
		this.mapPosition.lat = store.coordinates.lat;
		this.mapPosition.lng = store.coordinates.lng;
		this.mapZoom = 9;
		this.activeMarkerIndex = index;
		this.selectedStore = store;
		this.mobileStoreDetailsVisible = true;
	}

	dismissStoreDetailsView() {
		this.mobileStoreDetailsVisible = false;
		this.activeMarkerIndex = -1;

		// Give time for the details view to animate out of view before
		// destroying the selected store
		setTimeout(() => {
			this.selectedStore = null;
		}, 250);
	}

	infowindowData = {
		storeIndex: -1,
		storeData: null
	};

	// called when user clicks 'Store details >' button of the Store Details panel.
	// Displays a modal with that store's device summary
	displaySelectedStoreDeviceSummary() {

		this.storeService.fetchStoreDeviceSummary().then((summaries: DeviceSummary[]) => {
			this.selectedStoreDeviceSummaries = summaries;
			this.deviceSummaryModalVisible = true;
		});

	}

	dismissSelectedStoreDeviceSummary() {
		this.deviceSummaryModalVisible = false;
	}

	ngOnInit() {
		this.fetchStoreSummaries();

		this.mapsAPILoader.load().then(() => {
			console.log('MAPS API LOADER');
			const latLngBounds = new google.maps.LatLngBounds();
			console.log(latLngBounds);
		});
	}
}
