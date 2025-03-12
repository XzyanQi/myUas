import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { ChatService } from './../../../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, AfterViewChecked {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  id: string;
  name: string;
  chats: Observable<any[]>;
  message: string;
  isLoading: boolean;
  model = {
    icon: 'chatbubbles-outline',
    title: 'No Conversation',
    color: 'danger'
  };

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public chatService: ChatService,
    private global: GlobalService
  ) { }

  ngOnInit() {
    const data: any = this.route.snapshot.queryParams;
    if(data?.['name']){
      this.name = data['name'];
    }
    const id = this.route.snapshot.paramMap.get('id');
    if(!id) {
      this.navCtrl.back();
      return;
    }
    this.id = id;
    this.chatService.getChatRoomMessages(this.id);
    this.chats = this.chatService.selectedChatRoomMessages;
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.content) {
      if(this.chats) this.content.scrollToBottom(500);
    }
  }

  async sendMessage() {
    if(!this.message || this.message?.trim() == '') {
      return;
    }
    try {
      this.isLoading = true;
      await this.chatService.sendMessage(this.id, this.message);
      this.message = '';
      this.isLoading = false;
      this.chatService.getChatRoomMessages(this.id);
      this.scrollToBottom();
    } catch(e) {
      this.isLoading = false;
      console.log('Error sending message', e);
    }
  }

}
