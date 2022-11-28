import { Component, OnInit } from '@angular/core';
import { user, userLogin } from 'src/user';
import { AuthService } from '../services/auth.service';
import { PasswordChangeComponent } from '../password-change-dialog/password-change.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: user[] = [];

  model = new userLogin( '', '');

  constructor(
    private readonly loginService: AuthService,
    private dialog : MatDialog, 
  ) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.loginService.login(this.model);
    console.log(this.model);
  }

  passwordChangeDialog() {
    this.showFailDialog();
  }

  showFailDialog(): void {
    this.dialog.open(PasswordChangeComponent);
  }

}
