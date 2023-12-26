import { Component } from '@angular/core';
import { bdInitialAssignments } from './shared/data';
import { Assignment } from './assignments/assignment.model';
import { AssignmentsService } from './shared/assignments.service';
//import { AuthService } from './shared/auth.service';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';

  constructor(private assignmentService:AssignmentsService/*private authService: AuthService, private router: Router*/) { }

  peuplerBD() {
    this.assignmentService.peuplerBD();
  }

  /*
  login() {
    if(!this.authService.loggedIn) {
      this.authService.logIn();
    }
    else {
      this.authService.logOut();
      // on renvoie vers la page d'accueil
      this.router.navigate(["/home"]);
    }
  }
  */

}
