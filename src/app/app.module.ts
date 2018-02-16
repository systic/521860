import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';


import { AppComponent } from './app.component';
import { AppContainerComponent } from './app-container/app-container.component';

// Services
import { AppService } from './services/app.service';
import { StoreService } from './services/store.service';
import { DeviceService } from './services/device.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    AppContainerComponent,
  ],
  imports: [
	  BrowserModule,
	  AppRoutingModule,
	  LoginModule,
	  CoreModule,
	  SharedModule,
  ],
	providers: [
		AppService,
		StoreService,
		DeviceService,
		UserService,
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
