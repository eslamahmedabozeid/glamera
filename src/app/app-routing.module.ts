import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { BusinessComponent } from './auth/business/business.component';
import { SuccessfullyComponent } from './auth/successfully/successfully.component';

const routes: Routes = [

  {path:'',component:RegisterComponent},
  {path:'business',component:BusinessComponent},
  {path:'successfully',component:SuccessfullyComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
