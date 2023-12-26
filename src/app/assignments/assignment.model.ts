export class Assignment {
    id!: number
    nom!: string
    dateDeRendu!: Date
    rendu!: boolean
    // ? signifie que la propriété est optionnelle et est automatiquement initialisée lors de la création de l'objet
    _id?: string
}