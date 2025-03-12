import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatBoxComponent } from 'src/app/components/chat-box/chat-box.component';
import { ComponentsModule } from "../../../components/components.module";
import { ChatPage } from './chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    ComponentsModule
],
  declarations: [ChatPage, ChatBoxComponent]
})
export class ChatPageModule {}
