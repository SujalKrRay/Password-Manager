import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PasswordManagerService {
  constructor(private fireStore: Firestore, private auth: Auth) {}

  //site queries
  addSite(data: Object) {
    const dbInstance = collection(this.fireStore, 'sites');
    return addDoc(dbInstance, data);
  }

  loadSites() {
    const dbInstance = collection(this.fireStore, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
  }

  updateSite(id: string, data: object) {
    const docInstance = doc(this.fireStore, 'sites', id);
    return updateDoc(docInstance, data);
  }

  deleteSite(id: string) {
    const docInstance = doc(this.fireStore, 'sites', id);
    return deleteDoc(docInstance);
  }

  //password queries
  addPassword(data: object, siteId: string) {
    const dbInstance = collection(this.fireStore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
  }

  loadPassword(siteId: string) {
    const dbInstance = collection(this.fireStore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, { idField: 'id' });
  }

  updatePassword(data: object, siteId: string, passwordId: string) {
    const docInstance = doc(this.fireStore, `sites/${siteId}/passwords`, passwordId);
    return updateDoc(docInstance, data);
  }

  deletePassword(siteId: string, passwordId: string) {
    const docInstance = doc(this.fireStore, `sites/${siteId}/passwords`, passwordId);
    return deleteDoc(docInstance);
  }

  //login
  login(email:string, password:string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
