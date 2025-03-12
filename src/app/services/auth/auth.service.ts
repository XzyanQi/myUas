import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _id = new BehaviorSubject<any>(null);
  currentUser: any;
  private _uid: string | null = null;


  constructor(
    private fireAuth: Auth,
    private apiService: ApiService
  ) { 
  }

  async login(email: string, password: string): Promise<any> {
    try {
      console.log('Login attempt with:', email);
      const response = await signInWithEmailAndPassword(this.fireAuth, email, password);
      console.log('Login successful:', response);
  
      if (response?.user) {
        this.setUserData(response.user.uid);
        return response.user; 
      }
    } catch (e) {
      console.error('Login error:', e);
      throw e;
    }
  }
  

  getId(): string | null {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      return currentUser.uid;
    }
  console.log('No user is currently logged in.');
  return null;
  }

  setUserData(uid: string) {
    this._id.next(uid);
  }

  randomIntFromInterval(min: number, max: number): number { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async register(formValue) {
    try {
      const registeredUser = await createUserWithEmailAndPassword(this.fireAuth, formValue.email, formValue.password);
      console.log('registered user: ', registeredUser);
      const data = {
        email: formValue.email,
        name: formValue.username,
        uid: registeredUser.user.uid,
        photo: 'https://randomuser.me/api/portraits/men/10.jpg',
      };
      await this.apiService.setDocument(`users/${registeredUser.user.uid}`, data);
      const userData = {
        id: registeredUser.user.uid
      };
      return userData;
    } catch(e) {
      throw(e);
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.fireAuth, email);
    } catch(e) {
      throw(e);
    }
  }

  async logout() {
    try {
      await this.fireAuth.signOut();
      this._id.next(null);
      this.currentUser = null;
      return true;
    } catch(e) {
      throw(e);
    }
  }

  checkAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.fireAuth, user => {
        console.log('Auth state changed:', user);
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }
  

  async getUserData(id) {
    console.log('Fetching user data for ID:', id);
    const docSnap: any = await this.apiService.getDocById(`users/${id}`);
    if (docSnap?.exists()) {
      return docSnap.data();
    } else {
      console.error('No such document exists for ID:', id);
      throw new Error('No such document exists');
    }
  }
  
}