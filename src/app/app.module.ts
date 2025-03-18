import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }, 
    provideFirebaseApp(() => initializeApp({
       apiKey: "AIzaSyA0NOIXwWM9XSJWOIpFXGswaBsQteQqpbE",
      authDomain: "myuas-ab9e2.firebaseapp.com",
      projectId: "myuas-ab9e2",
      storageBucket: "myuas-ab9e2.firebasestorage.app",
      messagingSenderId: "387284155100",
      appId: "1:387284155100:web:3a9925a33e57ded8d41219",
      measurementId: "G-R5F5TB7FMK"
  })), 
  provideAuth(() => getAuth()), 
  provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
