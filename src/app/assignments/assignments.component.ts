import { Component, OnInit, } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  //pour gérer la pagination (variables existent dans mangoose)
  page:number = 1;
  limit:number = 10;
  totalDocs!:number;
  totalPages!:number;
  nextPage!:number;
  prevPage!:number;
  hasPrevPage!:boolean;
  hasNextPage!:boolean;
  pagingCounter!:number;
  hasPrevPageInUrl!:boolean;
  hasNextPageInUrl!:boolean;
  prevPageInUrl!:number;
  nextPageInUrl!:number;

  titre = "Rendus des devoirs";
  ajoutActive = false;
  assignmentSelectionne!: Assignment | null;
  formVisible = false;
  assignments!:Assignment[];

  

  constructor(private assignmentService:AssignmentsService) { }

  
  ngOnInit(): void {
    //this.assignments = this.assignmentService.getAssignments();
    //this.getAssignments();
    this.assignmentService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      this.pagingCounter = data.pagingCounter;
      this.hasPrevPageInUrl = data.hasPrevPageInUrl;
      this.hasNextPageInUrl = data.hasNextPageInUrl;
      this.prevPageInUrl = data.prevPageInUrl;
      this.nextPageInUrl = data.nextPageInUrl;
      console.log("Données reçues !");
    });
  }

  // on renvoie un observable
  getAssignments() {
    this.assignmentService.getAssignments()
      .subscribe(assignments => this.assignments = assignments);
  }

  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }

  //supprimer un assignment
  onAssignmentDelete(event: Assignment) {
    console.log("On va supprimer l'assignment");
    const index = this.assignments.findIndex(
      (assignmentEl) => {
        if(assignmentEl === event) {
          return true;
        }
        return false; // Add this line to return false if the condition is not met
      }
    );
    this.assignments.splice(index, 1);
    // Réinitialiser l'assignment sélectionné pour que la carte de détail disparaisse
    this.assignmentSelectionne = null;
  }

  //tu mers tes methodes
  onPreviousPage() {
    this.page--;
    this.ngOnInit();
  }

  onNextPage() {
    this.page++;
    this.ngOnInit();
  }
  peuplerBD() {
    this.assignmentService.peuplerBD();
  }
}