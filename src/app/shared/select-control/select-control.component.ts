import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-select-control',
	templateUrl: './select-control.component.html',
	styleUrls: [ './select-control.component.scss' ]
})
export class SelectControlComponent {
	@Input() options: string[] = [];
	@Input() prompt: string;

	selectedOption = '';

	optionsVisible = false;

	toggleOptions() {

		this.optionsVisible = !this.optionsVisible;
	}

	onOptionSelected(option: string) {
		this.selectedOption = option;
		this.optionsVisible = false;
	}
}
