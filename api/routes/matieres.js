let Matiere = require('../model/matiere');

function getMatieres(req, res) {
    User.find((err, matieres) => {
        if(err){
            res.send(err)
        }
        res.send(matieres);
    });
}

// Récupérer une matiere par son nom (GET)
function getMatiere(req, res){
    let nom = req.params.nom;

    Matiere.findOne({login: nom}, (err, matiere) =>{
        if(err){res.send(err)}
        res.json(matiere);
    })
}


module.exports = { getMatieres, getMatiere };
