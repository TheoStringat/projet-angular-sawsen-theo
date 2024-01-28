import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Matiere } from '../matiere.model';

@Injectable({
  providedIn: 'root'
})

export class MatieresService {

  constructor(private http:HttpClient) {}

  url = '/api/matieres';

  
  getMatieres():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.url);
  }

  getMatiere(nom:String):Observable<Matiere|undefined> {
    return this.http.get<Matiere>(this.url + '/' + nom);
  }

}