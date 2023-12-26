import { Component } from '@angular/core';
import { bdInitialAssignments } from './shared/data';
import { Assignment } from './assignments/assignment.model';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';
  

  constructor(private assignmentService:AssignmentsService,
              private authService:AuthService) { }

  peuplerBD() {
    this.assignmentService.peuplerBD();
  }


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
