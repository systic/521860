import { Component, Input } from '@angular/core';

// Interfaces
import {
	UserSummary,
} from '../../../interfaces';


/**
 *  User Card Component
 *
 *  Displays a user in the grid layout of the User Management page
 *
 */
@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: [ './user-card.component.scss' ]
})
export class UserCardComponent {

	@Input() user: UserSummary;
}
