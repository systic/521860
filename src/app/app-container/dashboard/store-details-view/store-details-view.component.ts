import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

// Interfaces
import { StoreSummary } from '../../../interfaces';

@Component({
	selector: 'store-details-view',
	templateUrl: './store-details-view.component.html',
	styleUrls: [ './store-details-view.component.scss' ]
})
export class StoreDetailsViewComponent implements OnInit {

	@Input() store: StoreSummary;
	@Output() displayDeviceSummary = new EventEmitter<void>();
	@Output() dismiss = new EventEmitter<void>();


	posAisles = {
		percentPerfect: 0,
		percentGood: 0,
		percentDown: 0
	};

	network = {
		percentConnected: 0,
		percentNotConnected: 0
	};
	
	private setPOSAislesPercentages() {
		const store = this.store;
		const total = store.posAisles.count;

		const perfectPercent = 100 * ( store.posAisles.numPerfect / total );
		const goodPercent = 100 * ( store.posAisles.numGood / total );
		const downPercent = 100 * ( store.posAisles.numDown / total );

		this.posAisles.percentPerfect = Math.round(100 * perfectPercent) / 100;
		this.posAisles.percentGood = Math.round(100 * goodPercent) / 100;
		this.posAisles.percentDown = Math.round(100 * downPercent) / 100;
	}

	private setNetworkPercentages() {
	}

	dismissView() {
		this.dismiss.emit();
	}

	onStoreDetailsBtnClick() {
		this.displayDeviceSummary.emit();
	}

	ngOnInit() {
		this.setPOSAislesPercentages();
	}
}
