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
      apiKey: "xxxxxxxx",
      authDomain: "xxxxxxx",
      projectId: "xxxxxxx",
      storageBucket: "xxxxxxx",
      messagingSenderId: "xxxxx",
      appId: "xxxxx",
      measurementId: "xxxxxx"
  })), 
  provideAuth(() => getAuth()), 
  provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
