import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { AES, enc } from 'crypto-js';

@Component({
  selector: 'comp-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;
  siteId!: string;

  passwordList!: Array<any>;

  username!: string;
  email!: string;
  password!: string;
  passwordId!: string;

  formState: string = 'Add New';

  isSuccess: boolean = false;
  successMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private passwordManagerService: PasswordManagerService
  ) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
    });

    this.loadPassword();
  }

  resetForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.passwordId = '';
    this.formState = 'Add new';
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  onSubmit(values: any) {
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;

    if (this.formState == 'Add New') {
      this.passwordManagerService
        .addPassword(values, this.siteId)
        .then(() => {
          this.showAlert('Password Saved Successfully.');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passwordManagerService
        .updatePassword(values, this.siteId, this.passwordId)
        .then(() => {
          this.showAlert('Password Updated Successfully.');
          this.resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  loadPassword() {
    this.passwordManagerService.loadPassword(this.siteId).subscribe(val => {
      this.passwordList = val;
    })
  }

  editPassword(
    username: string,
    email: string,
    password: string,
    passwordId: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.passwordId = passwordId;
    this.formState = 'Edit';
  }

  deletePassword(passwordId: string) {
    this.passwordManagerService
      .deletePassword(this.siteId, passwordId)
      .then(() => {
        this.showAlert('Password Deleted Successfully.');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  encryptPassword(password: string) {
    const secretKey = 'GRA8tIrbbvGkzIk4beTIZkIPk0OlQpb6';
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const secretKey = 'GRA8tIrbbvGkzIk4beTIZkIPk0OlQpb6';
    const decPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decPassword;
  }

  onDecrypt(password:string, index:number) {
    const decPassword = this.decryptPassword(password);
    this.passwordList[index].password = decPassword;
  }
}
