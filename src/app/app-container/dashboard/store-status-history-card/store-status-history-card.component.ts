import { Component, Input, OnInit } from '@angular/core';

// Interfaces
import { HourlyStoreStatusSummary } from '../../../interfaces';

/**
 *
 *  Store Status History Card
 *
 *  Displays a bar graph of store status summaries
 *
 */
@Component({
	selector: 'store-status-history-card',
	templateUrl: './store-status-history-card.component.html',
	styleUrls: [ './store-status-history-card.component.scss' ]
})
export class StoreStatusHistoryCardComponent implements OnInit {

	@Input() history: HourlyStoreStatusSummary[];
	@Input() currentHour: string; // i.e. '14:00'

	// The height of a 100% bar in pixels
	maxBarHeight = 86;
	maxActivePercent = 0;
	maxIssuePercent = 0;

	// Get the maximum Active and Issue percents in the history.
	// Used for setting correct heights for the bars
	private getMaximumPercents() {

		var minActivePercent = 100;
		this.history.forEach((stat: HourlyStoreStatusSummary) => {
			if ( stat.percentActive > this.maxActivePercent ) {
				this.maxActivePercent = stat.percentActive;
			}

			// Use the minimum active percent to calculate the maximum
			// issue percent
			if ( stat.percentActive < minActivePercent ) {
				minActivePercent = stat.percentActive;
			}
		});

		this.maxIssuePercent = 100 - minActivePercent;
	}

	ngOnInit() {
		this.getMaximumPercents();
	}

	ngOnChanges() {
		this.getMaximumPercents();
	}
}
