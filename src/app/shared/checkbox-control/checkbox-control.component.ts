import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-checkbox-control',
	templateUrl: './checkbox-control.component.html',
	styleUrls: [ './checkbox-control.component.scss' ]
})
export class CheckboxControlComponent {

	@Input() label: string;
}
