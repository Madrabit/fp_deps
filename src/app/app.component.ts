import { EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './shared/model/user';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'queryfp';
  currentUser: User;
  public onLogin: EventEmitter<any> = new EventEmitter<any>();
  private _serviceSubscription;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
    this._serviceSubscription = this.onLogin.subscribe({
      next: (event: any) => {
        this.currentUser = JSON.parse(event.message);
      }
    })
  }

  logOut() {
    this._serviceSubscription.unsubscribe();
    this.authService.logOut()
      .subscribe(
        data => {
          // @ts-ignore
          this.currentUser = null;
          this.router.navigate(['/login']);
        },
        error => {

        });
  }

}
