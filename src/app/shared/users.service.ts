import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http:HttpClient) {}

  url = 'http://localhost:10000/api/users';

  
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }


}