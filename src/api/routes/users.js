let User = require('../model/user');

function getUsers(req, res) {
    User.find((err, users) => {
        if(err){
            res.send(err)
        }
        res.send(users);
    });
}

// Récupérer un user par son nom (GET)
function getUser(req, res){
    let userLogin = req.params.login;

    User.findOne({login: userLogin}, (err, user) =>{
        if(err){res.send(err)}
        res.json(user);
    })
}


module.exports = { getUsers, getUser };
