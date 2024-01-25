import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { Matiere } from '../matiere.model';
import { MatieresService } from './matieres.services';

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {

  constructor(private loggingService:LoggingService,
              private http:HttpClient,
              private matieresService:MatieresService) {
              }

  url = 'http://localhost:8010/api/assignments';

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.url);
  }

  // renvoie comme Observable l'assignment dont l'id est passé en paramètre, ou undefined s'il n'existe pas
  getAssignment(id:number):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(this.url + '/' + id);
  }

  addAssignment(assignment:Assignment):Observable<any> {
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    let deleteURI = this.url + '/' + assignment._id;
    return this.http.delete(deleteURI);
  }

  peuplerBD() {
    bdInitialAssignments.forEach(a => {
      let nouvelAssignment = new Assignment();
      
      nouvelAssignment.matiere = {} as Matiere;

      let tableMatieres: Matiere[] = [];
      this.matieresService.getMatieres().subscribe((matieres) => {
        tableMatieres = matieres;
      });

      const matiereTrouvee = tableMatieres.find((m) => m.nom === a.matiere);
      if (matiereTrouvee) {
        nouvelAssignment.matiere = {
          nom: matiereTrouvee.nom,
          imageMatiere: matiereTrouvee.imageMatiere,
          prof: matiereTrouvee.prof
        };
      }
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.remarques = a.remarques;
      nouvelAssignment.note = a.note;
      nouvelAssignment._id = a._id;
 
      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    });
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<any>(this.url + '?page=' + page + '&limit=' + limit);
  }

}
