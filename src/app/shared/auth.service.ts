import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  tableLoggin: User[] = [];
  currentUser: User | null = null;

  constructor(private usersService: UsersService ) {

    this.usersService.getUsers().subscribe((users) => {
      this.tableLoggin = users;
      if (this.tableLoggin.length === 0) {
        console.log("ERREUR : AUCUN UTILISATEUR TROUVE");
      }
    });
    
  }

  logIn(login: string, password: string): boolean {
    const user = this.tableLoggin.find((user) => user.login === login && user.password === password 
      && (user.role === 'admin' || user.role === 'user'));
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      return this.loggedIn;
    } else {
      this.loggedIn = false;
      return this.loggedIn;
    }
  }

  logOut() {
    this.loggedIn = false;
    this.currentUser = null;
  }


  // renvoie une promesse qui, lorsqu'elle est "résolved", renvoie si l'utilisateur
  // est admin ou pas. Verifie si le role est 'admin'
  // Vérifie si un utilisateur est un administrateur
  isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.loggedIn && this.currentUser?.role === 'admin') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  isAdmin2(): boolean {
    return this.loggedIn && this.currentUser?.role === 'admin';
  }



  // renvoie une promesse qui, lorsqu'elle est "résolved", renvoie si l'utilisateur
  // est loggé ou pas s'il est present dans le tableau tableLoggin quand on le parcourt
  // Vérifie si un utilisateur est connecté
  isLogged(): Promise<boolean> {
    return Promise.resolve(this.loggedIn);
  }
    
} 
