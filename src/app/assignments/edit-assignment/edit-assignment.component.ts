import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})

export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;
  noteAssignment!: number | null;
  remarquesAssignment!: string | null;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAssignment();

    // afichage des queryParams et fragment
    console.log("Query Params : ", this.route.snapshot.queryParams);
    console.log("Fragment : ", this.route.snapshot.fragment);
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];

    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      if (!assignment) return;
      this.assignment = assignment;
      // Pour pré-remplir le formulaire
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      //attribuer noteAssignment et mettre 'null' si pas de note
      this.noteAssignment = assignment.note ? assignment.note : null;
      this.remarquesAssignment = assignment.remarques ? assignment.remarques : null;
    });
  }
  onSaveAssignment() {
    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    // on attribue la note si elle existe et commentaire si il existe
    if (this.noteAssignment) {
      this.assignment.note = this.noteAssignment;
    }
    if (this.remarquesAssignment) {
      this.assignment.remarques = this.remarquesAssignment;
    }
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        // navigation vers la home page uniquement après que la modification ait été effectuée
        this.router.navigate(['/home']);
      });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin2();
  }
}
