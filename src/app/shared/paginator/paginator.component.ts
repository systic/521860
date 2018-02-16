import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

@Component({
	selector: 'app-paginator',
	templateUrl: './paginator.component.html',
	styleUrls: [ './paginator.component.scss' ]
})
export class PaginatorComponent implements OnInit, OnChanges {

	@Input() numPages: number;
	@Input() currentPage: number; // zero-based

	@Output() paged = new EventEmitter<number>();

	pageCounter: number[];

	nextPage() {

		if ( this.currentPage < this.numPages - 1 ) {
			this.currentPage += 1;
			this.paged.emit(this.currentPage);
		}
	}

	prevPage() {
		if ( this.currentPage > 0 ) {
			this.currentPage -= 1;
			this.paged.emit(this.currentPage);
		}
	}

	selectPage(pageIndex: number) {
		if ( this.currentPage !== pageIndex ) {
			this.currentPage = pageIndex;
			this.paged.emit(this.currentPage);
		}
	}

	ngOnInit() {
		this.pageCounter = new Array(this.numPages).fill(0);
	}

	ngOnChanges() {
		this.pageCounter = new Array(this.numPages).fill(0);
	}
}
