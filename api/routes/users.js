let User = require('../model/user');

function getUsers(req, res) {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.send(err);
        });
}


// Récupérer un user par son nom (GET)
function getUser(req, res){
    let userLogin = req.params.login;

    User.findOne({login: userLogin})
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.send(err);
        });
}



module.exports = { getUsers, getUser };
