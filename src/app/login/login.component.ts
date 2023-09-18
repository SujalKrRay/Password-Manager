import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private passwordManagerService: PasswordManagerService, private router: Router, private toastr: ToastrService) {}

  onSubmit(values:any) {
    this.passwordManagerService.login(values.email, values.password)
    .then(() => {
      this.router.navigate(['/site-list']);
      this.toastr.success(
        'Welcome to Password Manager..',
        'Login Successful !',
      );
    })
    .catch(() => {
      this.toastr.error('Please check and try again...','Email or Password is Incorrect !');
    })
  }
}
