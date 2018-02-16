import { Component, AfterViewInit,  OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

// Interfaces
import { DeviceSummary } from '../../../interfaces';

@Component({
	selector: 'device-summary-modal',
	templateUrl: './device-summary-modal.component.html',
	styleUrls: [ './device-summary-modal.component.scss' ]
})
export class DeviceSummaryModalComponent implements OnInit, AfterViewInit {

	@Input() deviceSummaries: DeviceSummary[] = [];
	@Output() dismiss = new EventEmitter<void>();

	displayedDeviceSummaries: DeviceSummary[] = [];

	modalVisible = false;

	lastSortedColumn = '';
	sortAscending = {
		deviceName: true,
		health: true,
	};

	rowsPerPage = 13;
	currentPage = 0;
	numPages = 0;

	tableCarouselOptions = {
		grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
		slide: 1,
		touch: true,
		point: {
			visible: true,
			pointStyles: `
				.ngxcarouselPoint {
					list-style-type: none;
					text-align: center;
					position: absolute;
					width: 100%;
					bottom: 100%;
					left: 0;
					box-sizing: border-box;
					margin-bottom: 0;
				}

				.ngxcarouselPoint li {
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 4px;
					background-color: #e4e4e4;
				}

				.ngxcarouselPoint li:not(:last-of-type) {
					margin-right: 7px;
				}

				.ngxcarouselPoint li.active {
					background-color: #00a2e0;
				}
			`
		}
	};

	private updateDisplayedDeviceSummaries() {
		const startIndex = this.currentPage * this.rowsPerPage;
		this.displayedDeviceSummaries = this.deviceSummaries.slice(startIndex, startIndex + this.rowsPerPage);
	}

	dismissModal() {
		this.modalVisible = false;

		setTimeout(() => {
			this.dismiss.emit();
		}, 250);
	}

	sortByDeviceName() {
		const ascend = this.sortAscending.deviceName;

		this.deviceSummaries.sort((a, b) => {
			if ( ascend ) {
				return a.name < b.name ? -1 : 1;
			}

			return a.name < b.name ? 1 : -1;
		});
		this.sortAscending.deviceName = !this.sortAscending.deviceName;

		this.updateDisplayedDeviceSummaries();
	}

	sortByDeviceHealth() {
		const ascend = this.sortAscending.health;

		this.deviceSummaries.sort((a, b) => {
			if ( ascend ) {
				return a.health < b.health ? -1 : 1;
			}

			return a.health < b.health ? 1 : -1;
		});
		this.sortAscending.health = !this.sortAscending.health;

		this.updateDisplayedDeviceSummaries();
	}

	// Called after user interacts with the paginator
	onNewPage(pageIndex: number) {
		this.currentPage = pageIndex;
		this.updateDisplayedDeviceSummaries();
	}


	ngOnInit() {
		this.displayedDeviceSummaries = this.deviceSummaries.slice(0, this.rowsPerPage);

		const numDevices = this.deviceSummaries.length;
		this.numPages = Math.floor( numDevices / this.rowsPerPage ) +
			( numDevices % this.rowsPerPage === 0 ? 0 : 1 );
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.modalVisible = true;
		}, 150);
	}
}
