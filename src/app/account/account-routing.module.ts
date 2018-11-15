import { Routes, RouterModule } from '@angular/router';
import { AccountPageComponent } from './page/account.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [{ path: '', component: AccountPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
