import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Matiere } from 'src/app/matiere.model';
import { MatieresService } from 'src/app/shared/matieres.services';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})

export class AddAssignmentComponent implements OnInit{

  nomDevoir: string = "";
  dateDeRendu!: Date;
  matieres!: Matiere[];
  matiereSelectionnee!: string;
  profSelectionne!: string;
  nomEleve!: string;

  constructor(private assignmentsService:AssignmentsService,
              private matieresService:MatieresService) { }

  ngOnInit(): void {
    this.matieresService.getMatieres()
      .subscribe((matieres: Matiere[]) => {
        this.matieres = matieres;
      });
  }

  onSubmit() {
    const newAssignment = new Assignment();

    newAssignment.matiere = {} as Matiere;

    const matiereTrouvee = this.matieres.find((m) => m.nom === this.matiereSelectionnee);
    if (matiereTrouvee) {
      newAssignment.matiere.imageMatiere = matiereTrouvee.imageMatiere;
      newAssignment.matiere.prof = matiereTrouvee.prof;
    }
    newAssignment.auteur = this.nomEleve;
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.note = 99; //note par defaut si l'assignment n'est pas rendu
    newAssignment.matiere.nom = this.matiereSelectionnee;
    newAssignment.id = 1000 + Math.floor(Math.random() * 1000);

    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
      }
    );
  }

  onAnnuler() {
    this.nomDevoir = "";
    this.dateDeRendu = new Date();
  
  }



}
