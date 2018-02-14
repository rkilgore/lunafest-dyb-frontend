import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "../login/login.component";
import { AuthWrapperComponent } from '../auth-wrapper/auth-wrapper.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { MyBidsComponent } from '../my-bids/my-bids.component';
import { RegistrationComponent } from '../registration/registration.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: "sign-up", component: RegistrationComponent },
  { path: 'user', component: AuthWrapperComponent,
    children: [
      { path: "list", component: ItemListComponent },
      { path: "bids", component: MyBidsComponent }
    ]
  },
  { path: "", redirectTo: "/login", pathMatch: "full"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
