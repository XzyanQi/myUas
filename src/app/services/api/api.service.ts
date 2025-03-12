import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, getDocs, orderBy, OrderByDirection, query, setDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: Firestore) { }

  docRef(path: string) {
    return doc(this.firestore, path);
  }

  collectionRef(path) {
    return collection(this.firestore, path);
  }

  setDocument(path: string, data: any) {
    const dataRef = this.docRef(path);
    return setDoc(dataRef, data); 
  }

  addDocument(collectionName: string, data: any) {
    const collectionRef = this.collectionRef(collectionName);
    return setDoc(doc(collectionRef), data);
  }

  getDocById(path: string) {
    const docRef = this.docRef(path);
    return getDoc(docRef);
  }

  getDocs(path, queryFn?) {
    let dataRef: any = this.collectionRef(path);
    if(queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    return getDocs(dataRef); 
  }

  collectionDataQuery(path, queryFn?) {
    let dataRef: any = this.collectionRef(path);
    if(queryFn) {
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    const collection_data = collectionData<any>(dataRef, {idField: 'id'}); 
    return collection_data;
  }

  docDataQuery(arg0: string, arg1: boolean) {
   throw new Error ('Method not implemented.');
  }

  whereQuery(fieldPath, condition, value) {
    return where(fieldPath, condition, value);
  }

  orderByQuery(fieldPath, directionStr: OrderByDirection = 'asc') {
    return orderBy(fieldPath, directionStr);
  }

}
