let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
  /*
  function getAssignments(req, res) {
    let query = {};
    if (req.query.rendu) {
        query.rendu = req.query.rendu === 'true';
    }

    let aggregateQuery = Assignment.aggregate([
        { $match: query }
    ]);

    Assignment.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, assignments) => {
        if (err) {
          res.send(err);
        }
        res.send(assignments);
      }
    );
}
*/

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
  let query = {};
  if (req.query.rendu) {
      query.rendu = req.query.rendu === 'true';
  }

  if (req.query.nom) {
      query.nom = { $regex: req.query.nom, $options: "i" }; // Recherche insensible à la casse
  }

  let aggregateQuery = Assignment.aggregate([
      { $match: query }
  ]);

  Assignment.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    },
    (err, assignments) => {
      if (err) {
        res.send(err);
      }
      res.send(assignments);
    }
  );
}




// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
  let assignmentId = req.params.id;

  Assignment.findOne({id: assignmentId})
      .then(assignment => {
          res.json(assignment);
      })
      .catch(err => {
          res.send(err);
      });
}


// Ajout d'un assignment (POST)
function postAssignment(req, res){
  let assignment = new Assignment();
  assignment.id = req.body.id;
  assignment.nom = req.body.nom;
  assignment.dateDeRendu = req.body.dateDeRendu;
  assignment.rendu = req.body.rendu;
  assignment.auteur = req.body.auteur;
  assignment.note = req.body.note;
  assignment.remarques = req.body.remarques;
  assignment.matiere = req.body.matiere;

  console.log("POST assignment reçu :");
  console.log(assignment)

  assignment.save()
      .then(() => {
          res.json({ message: `${assignment.nom} saved!`});
      })
      .catch(err => {
          res.status(500).send('cant post assignment ', err);
      });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true})
  .then(() => {
    res.json({message: 'updated'})
  })
  .catch(err => {
    console.log(err);
    res.send(err)
  });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  Assignment.findByIdAndDelete(req.params.id)
    .then(assignment => {
      if (assignment) {
        res.json({message: `${assignment.nom} deleted`});
      } else {
        res.status(404).json({message: "Assignment not found"});
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
