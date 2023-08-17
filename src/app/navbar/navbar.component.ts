import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';

@Component({
  selector: 'comp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private passwordService: PasswordManagerService){}

  onlogout(){
    this.passwordService.logout();
  }

}
