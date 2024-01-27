import { Component, OnInit, } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

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
  assignments!: Assignment[];
  displayedColumns: string[] = ['dateDeRendu', 'nom', 'auteur', 'etat'];

  

  constructor(private assignmentService:AssignmentsService,
              private router:Router) { }

  
  ngOnInit(): void {
    this.getPaginatorAssignments();
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    // si l'utilisateur clique sur le bouton de la page d'après
    if(event.pageIndex > (event.previousPageIndex ?? 0)) {
      this.page++;
    }
    // si l'utilisateur clique sur le bouton de la page d'avant
    else if((event.previousPageIndex ?? 0) > 0 && event.pageIndex < (event.previousPageIndex ?? 0)) {
      this.page--;
    }
    // si l'utilisateur change le nombre d'éléments par page
    this.limit = event.pageSize;
    
    this.getPaginatorAssignments();
  }

  getPaginatorAssignments() {
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
    this.router.navigate(['/assignment', assignment.id]);
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
    //on met a jour la table
    this.getPaginatorAssignments();
  }

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