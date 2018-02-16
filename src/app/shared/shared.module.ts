import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxControlComponent } from './checkbox-control/checkbox-control.component';
import { FooterComponent } from './footer/footer.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SelectControlComponent } from './select-control/select-control.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		CheckboxControlComponent,
		FooterComponent,
		PaginatorComponent,
		SelectControlComponent,
	],
	exports: [
		CheckboxControlComponent,
		FooterComponent,
		PaginatorComponent,
		SelectControlComponent,
	]
})
export class SharedModule {
}
