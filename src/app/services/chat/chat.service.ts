import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { AuthService } from './../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  currentUserId: string;
  public users: Observable<any>;
  public chatRooms: Observable<any>;
  public selectedChatRoomMessages: Observable<any>;

  constructor(
    public auth: AuthService, 
    private api: ApiService
  ) { 
    this.getId();
  }

  private getId() {
    this.currentUserId = this.auth.getId();
    console.log('Current User ID:', this.currentUserId);
  }

  getUsers() {
    if (!this.currentUserId) this.getId(); //id harus ada
    this.users = this.api.collectionDataQuery(
      'users', 
      this.api.whereQuery('uid', '!=', this.currentUserId)
    );
  }

  async createChatRoom(user_id: string) {
    try {
      // check apakah chatRooms ada
      const querySnapshot = await this.api.getDocs(
        'chatRooms',
        this.api.whereQuery(
          'members', 
          'in', 
          [[user_id, this.currentUserId], [this.currentUserId, user_id]]
        )
      );
      const room = querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (room?.length > 0) return room[0]; //ada,kembalian
  
      //belum ada, buat baru
      const data = {
        members: [this.currentUserId, user_id],
        type: 'private',
        createdAt: new Date(),
        updateAt: new Date(),
      };

      return await this.api.addDocument('chatRooms', data);
    } catch (error) {
      console.error('Failed to create chat room:', error);
      throw error;
    }
  }

  getChatRooms() {
   if (!this.currentUserId) this.getId();
   this.chatRooms = this.api.collectionDataQuery(
     'chatRooms', 
     this.api.whereQuery('members', 'array-contains', this.currentUserId)
   ).pipe(
     map((data: any[]) => data.map((element) => {
       const otherUserId = element.members.find(
        (x) => x !== this.currentUserId
       );
       const user = this.api.docDataQuery(`users/${otherUserId}`, true);
       return { ...element, user };
     })
    ),
    catchError((error) => {
      console.error('Error fetching chat rooms:', error);
      return of([]);
    })
   );
  }

  getChatRoomMessages(chatRoomId: string) {
    this.selectedChatRoomMessages = this.api.collectionDataQuery(
      `chats/${chatRoomId}/messages`, 
      this.api.orderByQuery('createdAt', 'desc')
    )
    .pipe(map((arr: any) => arr.reverse()),
    catchError((error) => {
      console.error('Error fetching chat room messages:', error);
      return of([]);
    }));
  }

  async sendMessage(chatId: string, msg: string) {
    if (!msg.trim()) return; //tidak mengirim pesan kosong
    try {
      const new_message = {
        message: msg,
        sender: this.currentUserId,
        createdAt: new Date()
      };
      console.log('Sending message to chat ID:', chatId);
      await this.api.addDocument(`chats/${chatId}/messages`, new_message);
    } catch(error) {
      console.error('Failed to sending message:', error);
      throw error;
    }

}
}