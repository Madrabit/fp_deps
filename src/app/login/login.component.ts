import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user';
import { AuthService } from '../shared/service/auth.service';
import {Router} from "@angular/router";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  currentUser: User;
  errorMessage: string | undefined;

  constructor(private authService :AuthService, private router: Router) {
    this.currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    if(this.currentUser){
      this.router.navigate(['/departments']);
    }
  }

  login(){
    this.authService.logIn(this.user)
      .subscribe(data=>{
        console.log(data)
          this.emitLogin(JSON.stringify(data));
          this.router.navigate(['/departments']);
        },err=>{
          this.errorMessage="Error :  Username or password is incorrect";
        }
      )
  }

  onLogin: EventEmitter<any> = new EventEmitter<any>();

  emitLogin(message: string) {
    this.onLogin.emit({message: message});
  }


}
