import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {
  loggin!: string;
  password!: string;
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  hide = true;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const login = this.loginForm.value.login;
      const password = this.loginForm.value.password;
      if(this.authService.logIn(login || '', password || '')){
        this.router.navigate(["/home"]);
        //ne plus afficher le bouton de connexion
        const loginElement = document.getElementById('ico_login');
        const logoutElement = document.getElementById('ico_logout');
        if (loginElement !== null && logoutElement !== null) {
          loginElement.style.display = 'none';
          logoutElement.style.display = 'block';
        }
      }
      else {
        alert("Login ou mot de passe incorrect !");
      }
    }
  }

}