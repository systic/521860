import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { StoreStatusHistoryCardComponent } from './store-status-history-card/store-status-history-card.component';
import { StoreInfoWindowComponent } from './store-info-window/store-info-window.component';
import { StoreDetailsViewComponent } from './store-details-view/store-details-view.component';
import { DeviceSummaryModalComponent } from './device-summary-modal/device-summary-modal.component';

// Constants
import { GOOGLE_MAPS_API_KEY } from '../../constants';

@NgModule({
	imports: [
		CommonModule,
		DashboardRoutingModule,
		SharedModule,
		AgmCoreModule.forRoot({
			apiKey: GOOGLE_MAPS_API_KEY
		}),
		AgmSnazzyInfoWindowModule,
		NgxCarouselModule,
	],
	declarations: [
		DashboardPageComponent,
		StoreStatusHistoryCardComponent,
		StoreInfoWindowComponent,
		StoreDetailsViewComponent,
		DeviceSummaryModalComponent,
	]
})
export class DashboardModule {
}
