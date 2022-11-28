import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { RentPageComponent } from './rent-page/rent-page.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { PasswordChangeComponent } from './password-change-dialog/password-change.component';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { Book } from './book';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  
  { path: '', redirectTo: '/book', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'book-detail', component: BookDetailComponent },
  { path: 'password-change-dialog', component: PasswordChangeComponent },
  { path: 'password-reset-form', component: PasswordResetFormComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'books', component: BookComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
