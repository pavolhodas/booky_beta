import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user, userLogin } from 'src/user';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../failed-login-dialog/dialog.component';
import { RegisterVerifyDialogComponent } from '../register-verify-dialog/register-verify-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  headers = new Headers();
  authString: string;
  users : user[] = [];
  username!: string;

  constructor(
    private readonly httpClient: HttpClient,
    private cookies: CookieService,
    private dialog : MatDialog, 
  ) { }

      getToken(): string {
        const authString = `${this.cookies.get('username')}:${this.cookies.get('password')}`
        return 'Basic ' + btoa(authString);
      }

    //   isLoggedIn(): boolean {
    //     return !!(this.cookies.get('username') && this.cookies.get('password'));
    //   }

    async login(user: userLogin){

        let authString = `${user.username}:${user.password}`
    
        this.headers.set('Authorization', 'Basic ' + btoa(authString))
    
        try {
          const response = await fetch('http://localhost:8080/login', {
            method: 'GET',
            headers: this.headers,
          });
          const data_1 = await response.json();
          this.cookies.set('username', user.username);
          //this.cookies.set('password', user.password );
          window.location.href="/home-page" 
    
        }
         catch (error) {
          console.log('Error:', error);
          this.showFailDialog();
        }
      }

      createUser (user:user) {
        fetch('http://localhost:8080/register', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(user),
       })
       .then(() => {
         console.log('Success!');
         //window.location.href="/login" 
         this.showRegisterVerifyialog();
       })
       .catch((error) => {
         console.error('Error:' , error);
         alert("faileeedddd")
       });
   
     }
   
     logout() : void { 
       this.cookies.delete ('username');
       //this.cookies.delete('password');
       //this.cookies.delete('selectedRole');
       //this.userSubject.next();
       location.reload();
     }

  //    changePassword( password : string){

  //     fetch('http://localhost:8080/api/auth/change/password/' + password, {
  //       method: 'PUT',
  //       headers: new Headers({
  //         'Content-Type': "application/json; charset=utf8",
  //     }),
  //   })
  //   .then(() => {
  //     console.log('Success!');
  //     window.location.href="/login"
  //   })
  //   .catch((error) => {
  //     console.error('Error:' , error);
  //     alert("faileeedddd")
  //   });

  // }

      showFailDialog(): void {
        this.dialog.open(DialogComponent);
      }

      showRegisterVerifyialog(): void {
        this.dialog.open(RegisterVerifyDialogComponent);
      }

      sendPasswordResetEmail(email: string) {

        fetch('http://localhost:8080/password/forgot/' + email, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': "application/json; charset=utf8",
        }),
      })
      .then(() => {
        console.log('Success!');
        //this.showPasswordDialog();
      })
      .catch((error) => {
        console.error('Error:' , error);
        alert("faileeedddd")
      });
  
    } 

}