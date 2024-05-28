import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { PropertyComponent } from './pages/property/property.component';
import { authGuard } from './service/auth.guard';
import { PropertyDetailComponent } from './pages/property/property-detail/property-detail.component';
import { UpdatePropertyComponent } from './pages/property/update-property/update-property.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'property', component:PropertyComponent,canActivate:[authGuard]},
  {path:'property/create', component:UpdatePropertyComponent,canActivate:[authGuard]},
  {path:'property/edit/:id', component:UpdatePropertyComponent,canActivate:[authGuard]},
  {path:'property/:id', component:PropertyDetailComponent,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
