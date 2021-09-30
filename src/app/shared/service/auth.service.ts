import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

let API_URL = environment.indexUrl;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  logIn(user: User): Observable<any> {
    const headers = new HttpHeaders(user ? {
      authorization : 'Basic ' + btoa(user.username + ':' + user.password)
    } : {});
    return this.http.get<any>(API_URL + "user"
      , {headers: headers, responseType: 'text' as 'json'})
      .pipe(map(response => {
        if (response) {
          // @ts-ignore
          localStorage.setItem('currentUser', JSON.stringify({name:+user.username  ,  password: + user.password}));
        }
        return response;
      }));
  }

  logOut(): Observable<any>  {

    return this.http.post(API_URL+"logout",{})
      .pipe(map(response => {

        localStorage.removeItem('currentUser');
      }));

  }
}
