import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	templateUrl: './login-page.component.html',
	styleUrls: [ './login-page.component.scss' ]
})
export class LoginPageComponent {

	passwordVisible = false;

	togglePasswordVisibility() {
		this.passwordVisible = !this.passwordVisible;
	}

	constructor(private router: Router) { }

	navigateToDashboard() {
		this.router.navigate(['/dashboard']);
	}
}
