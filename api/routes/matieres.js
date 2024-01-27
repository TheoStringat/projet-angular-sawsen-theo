let Matiere = require('../model/matiere');

function getMatieres(req, res){
    Matiere.find()
        .then(matieres => {
            res.send(matieres);
        })
        .catch(err => {
            res.send(err);
        });
}


// Récupérer une matiere par son nom (GET)
function getMatiere(req, res){
    let nom = req.params.nom;

    Matiere.findOne({login: nom})
        .then(matiere => {
            res.json(matiere);
        })
        .catch(err => {
            res.send(err);
        });
}



module.exports = { getMatieres, getMatiere };
