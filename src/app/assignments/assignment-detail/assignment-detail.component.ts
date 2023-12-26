import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  /*@Input()*/ assignmentTransmis!:Assignment | null;
  @Output() deleteAssignment : EventEmitter<Assignment> = new EventEmitter();

  constructor(private assignmentsService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force la conversion de l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => this.assignmentTransmis = assignment || null);
  }

  onAssignmentRendu() {
    if(this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService.updateAssignment(this.assignmentTransmis)
        .subscribe(message => {
          console.log(message);
          this.router.navigate(["/home"]);
        }
      );
    }
    //this.router.navigate(["/home"]);
  }

  onAssignmentDelete() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis!)
      .subscribe(message => {
        console.log(message);
        // on navigue vers /home qu'une fois que la suppression a été effectuée
        this.router.navigate(["/home"]);
      });

    //this.assignmentTransmis = null;
    this.router.navigate(["/home"]);
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'],
    {queryParams: {nom: this.assignmentTransmis?.nom}, fragment: 'edition'});
  }

  isAdmin(): boolean {
    return this.authService.isAdmin2();
  }

}
