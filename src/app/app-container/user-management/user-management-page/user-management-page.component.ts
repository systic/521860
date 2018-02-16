import { Component, OnInit } from '@angular/core';

// Interfaces
import {
	UserSummary,
} from '../../../interfaces';

// Services
import { UserService } from '../../../services/user.service';

/**
 *
 *  User Management Page
 *
 */
@Component({
	templateUrl: './user-management-page.component.html',
	styleUrls: [ './user-management-page.component.scss' ]
})
export class UserManagementPageComponent implements OnInit {

	allUsers: UserSummary[] = [];
	displayedUsers: UserSummary[] = [];

	addUserFormVisible = false;

	gridLayout = true;

	numPages = 0;
	currentPage = 0;
	itemsPerPage = 15;

	sortAscending = {
		name: true,
		userId: true,
		role: true
	};

	private fetchUsers() {
		this.userService.fetchUsers().then((users: UserSummary[]) => {

			console.log('users: ');
			console.log(users);

			this.allUsers = users;
			this.displayedUsers = this.allUsers.slice(0, this.itemsPerPage);

			const numUsers = users.length;
			this.numPages = Math.floor(numUsers / this.itemsPerPage) +
				( numUsers % this.itemsPerPage === 0 ? 0 : 1 );
		});
	}

	private updateDisplayedUsers() {
		const startIndex = this.currentPage * this.itemsPerPage;
		this.displayedUsers = this.allUsers.slice(startIndex, startIndex + this.itemsPerPage);
	}

	constructor(private userService: UserService) { } 

	onNewPageSelected(newPage: number) {
		this.currentPage = newPage;
		this.updateDisplayedUsers();
	}

	sortByName() {
		const ascend = this.sortAscending.name;
		this.allUsers.sort((a, b) => {
			if ( ascend ) {
				return a.name < b.name ? -1 : 1;
			}

			return a.name < b.name ? 1 : -1;
		});

		this.updateDisplayedUsers();
		this.sortAscending.name = !this.sortAscending.name;
	}

	sortByUserId() {
		const ascend = this.sortAscending.userId;
		this.allUsers.sort((a, b) => {
			if ( ascend ) {
				return a.id < b.id ? -1 : 1;
			}

			return a.id < b.id ? 1 : -1;
		});

		this.updateDisplayedUsers();
		this.sortAscending.userId = !this.sortAscending.userId;
	}

	sortByRole() {
		const ascend = this.sortAscending.role;
		this.allUsers.sort((a, b) => {
			if ( ascend ) {
				return a.type < b.type ? -1 : 1;
			}

			return a.type < b.type ? 1 : -1;
		});

		this.updateDisplayedUsers();
		this.sortAscending.role = !this.sortAscending.role;
	}

	ngOnInit() {
		this.fetchUsers();
	}
}
