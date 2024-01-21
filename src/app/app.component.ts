import { Component } from '@angular/core';
import { Assignment } from './assignments/assignment.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = '';
  

  constructor(private assignmentService:AssignmentsService,
              private authService:AuthService) { }



  logout() {
    this.authService.logOut();
    const loginElement = document.getElementById('ico_login');
    const logoutElement = document.getElementById('ico_logout');
    if (loginElement !== null && logoutElement !== null) {
      loginElement.style.display = 'block';
      logoutElement.style.display = 'none';
    }
  }
}
