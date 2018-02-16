import { Component, Input } from '@angular/core';

// Interfaces
import { 
	StoreSummary
} from '../../../interfaces';

/**
 *  Store Info Window
 *
 *  The info window that appears when a user hovers over a marker 
 *  on the map on the Dashboard page.
 *
 */
@Component({
	selector: 'store-info-window',
	templateUrl: './store-info-window.component.html',
	styleUrls: [ './store-info-window.component.scss' ]
})
export class StoreInfoWindowComponent {

	@Input() store: StoreSummary;
}
