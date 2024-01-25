import { Matiere } from "../matiere.model"

export class Assignment {
    // ? signifie que la propriété est optionnelle et est automatiquement initialisée lors de la création de l'objet
    _id?: string
    nom!: string
    dateDeRendu!: Date
    rendu!: boolean
    auteur!: string
    matiere!: Matiere
    note!: number
    remarques!: string
    id!: number //id de l'assignment qui s'incremente automatiquement
}