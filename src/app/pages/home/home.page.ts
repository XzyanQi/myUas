import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { ChatService } from './../../services/chat/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('new_chat') modal: ModalController;
  @ViewChild('popover') popover: PopoverController;
  segment = 'chats';
  open_new_chat = false;
  users: Observable<any[]>;
  chatRooms: Observable<any[]>;
  model = {
    icon: 'chatbubbles-outline',
    title: 'No Chat Rooms',
    color: 'dark'
  };
 
//user =  [
//{ name: 'Faqih Muhammad Ihsan', photo: 'https://randomuser.me/api/portraits/men/1.jpg' },]
 
   //  Data Dummy untuk Status
   statusData = [
    { name: "Ihsan", avatar: "https://randomuser.me/api/portraits/men/10.jpg", lastUpdated: "10 minutes ago" },
    { name: "San", avatar: "https://randomuser.me/api/portraits/men/11.jpg", lastUpdated: "20 minutes ago" },
    { name: "XzyanQi", avatar: "https://randomuser.me/api/portraits/men/12.jpg", lastUpdated: "1 hour ago" },
    { name: "Evelena", avatar: "https://randomuser.me/api/portraits/women/13.jpg", lastUpdated: "2 hours ago" },
  ];

 //  Data Dummy untuk Calls
 callsData = [
  { name: "Ihsan", avatar: "https://randomuser.me/api/portraits/men/10.jpg", type: "Incoming", time: "Today, 10:30 AM" },
  { name: "San", avatar: "https://randomuser.me/api/portraits/men/11.jpg", type: "Outgoing", time: "Today, 9:00 AM" },
  { name: "XzyanQi", avatar: "https://randomuser.me/api/portraits/men/12.jpg", type: "Missed", time: "Yesterday, 4:45 PM" },
  { name: "Evelena", avatar: "https://randomuser.me/api/portraits/women/13.jpg", type: "Incoming", time: "Yesterday, 8:15 PM" },
];
constructor(
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    // this.chatService.getId();
    this.chatService.getChatRooms();
    this.chatRooms = this.chatService.chatRooms;
    console.log('chatRooms: ', this.chatRooms);
  }

  async logout() {
    try {
      console.log('Logging out...');
      await this.chatService.auth.logout();
      
      // Hapus data di local storage/session storage jika ada
      localStorage.clear();
      sessionStorage.clear();
  

   async logout() {
    try {
      await this.popoverCtrl.dismiss();

      // Hapus data di local storage/session storage jika ada
      localStorage.clear();
      sessionStorage.clear();
      
      await this.authService.logout();
      
      // Navigasi ke login
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  onSegmentChanged(event: any) {
    console.log(event);
    this.segment = event.detail.value;
  }

  newChat() {
    this.open_new_chat = true;
    if(!this.users) this.getUsers();
  }

  getUsers() {
    this.chatService.getUsers();
    this.users = this.chatService.users;
  }

  onWillDismiss(event: any) {}

  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }

  async startChat(item) { 
    if (!item?.uid) {
      console.error('User ID tidak ditemukan:', item);
      return;
    }
    try {
      const room = await this.chatService.createChatRoom(item.uid);
      console.log('Room:', room);
      this.cancel();
      const navData: NavigationExtras = { queryParams: { name: item?.name } };
      this.router.navigate(['/', 'home', 'chats', room?.id], navData);
    } catch (e) {
      console.log('Error saat membuat chat:', e);
    }
  }
  

getChat(item) { 
  (item?.user).pipe(take(1)).subscribe(user_data => { 
      console.log('data: ', user_data); 
      const navData: NavigationExtras = { queryParams: { name: user_data?.name } };
      this.router.navigate(['/', 'home', 'chats', item?.id], navData); 
  }); 
}


  getUser(user: any) {
    return user;
  }

}
