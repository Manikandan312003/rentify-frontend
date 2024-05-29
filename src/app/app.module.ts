import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { PropertyComponent } from './pages/property/property.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user.service';
import { AppConfig , initializeApp} from './service/app.config';
import { APP_INITIALIZER } from '@angular/core';
import { PropertyDetailComponent } from './pages/property/property-detail/property-detail.component';
import { PropertyViewComponent } from './pages/property/property-view/property-view.component';

import { UpdatePropertyComponent } from './pages/property/update-property/update-property.component';
import { FormDataService } from './service/formdata.service';
import { ApiService } from './service/api.service';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { PropertyFilterComponent } from './pages/property/property-filter/property-filter.component';
import { AddNearbyComponent } from './pages/property/update-property/add-nearby/add-nearby.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PropertyComponent,
    RegisterComponent,
    PropertyDetailComponent,
    PropertyViewComponent,
    UpdatePropertyComponent,
    AlertComponent,
    PropertyFilterComponent,
    AddNearbyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,FormsModule
  ],
  providers: [UserService,AppConfig,FormDataService,ApiService,AlertService,
    {
      provide:APP_INITIALIZER,
      useFactory:initializeApp,
      deps:[AppConfig],
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
