import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { Matiere } from '../matiere.modele';

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  // Tableau de matieres
  matieres: Matiere[] = [
    {nom: "Technologies Web", imageMatiere: "technoWeb.png", imageProf: "prof1.png"},
    {nom: "Base de données", imageMatiere: "bdd.png", imageProf: "prof2.png"},
    {nom: "Analyse financière", imageMatiere: "finance.png", imageProf: "prof4.png"},
    {nom: "Grails", imageMatiere: "grails.png", imageProf: "prof5.png"},
    {nom: "Economie", imageMatiere: "economie.png", imageProf: "prof6.png"},
    {nom: "Anglais", imageMatiere: "anglais.png", imageProf: "prof1.png"},
    {nom: "Mathématiques", imageMatiere: "mathematiques.png", imageProf: "prof2.png"},
    {nom: "Outils pour le big data", imageMatiere: "bigData.png", imageProf: "prof3.png"},
    {nom: "Planification de projet", imageMatiere: "planificationProjet.png", imageProf: "prof4.png"},
    {nom: "Programmation avancée Java", imageMatiere: "java.png", imageProf: "prof5.png"},
    {nom: "Communication", imageMatiere: "communication.png", imageProf: "prof6.png"},
    {nom: "Ingénierie des besoins", imageMatiere: "ingenierieBesoins.png", imageProf: "prof3.png"}
  ];

  constructor(private loggingService:LoggingService,
              private http:HttpClient) {}

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
      
      nouvelAssignment.matiere = {} as Matiere; // Initialisez matiere comme un objet vide

      const matiereTrouvee = this.matieres.find((m) => m.nom === a.matiere);
      if (matiereTrouvee) {
        console.log("ALERTEEEEEEEEE !!!");
        nouvelAssignment.matiere = {
          nom: matiereTrouvee.nom,
          imageMatiere: matiereTrouvee.imageMatiere,
          imageProf: matiereTrouvee.imageProf
        };
      }

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.note = a.note;
      nouvelAssignment.remarques = a.remarques;
      nouvelAssignment._id = a._id.$oid;
 
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
