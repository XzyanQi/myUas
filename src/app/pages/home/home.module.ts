import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { ComponentsModule } from "../../components/components.module";
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
],
  declarations: [HomePage, UserListComponent]
})
export class HomePageModule {}
