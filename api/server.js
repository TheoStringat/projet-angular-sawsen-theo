let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let user = require('./routes/users');
let matiere = require('./routes/matieres');
let fileURLToPath = require('url').fileURLToPath;
let path = require('path');
let dirname = require('path').dirname;
let cors = require('cors')

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud 
const uri = "mongodb+srv://theostringat2:passmongo@cluster0.vs5qkld.mongodb.net/assignments?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify:false
}; 

//tableau pour le cors
const tableauCors = [
  'http://localhost:5000',
  'http://localhost:4200',
  'http://localhost:8010',
  'http://localhost:80',
  'http://localhost',
  'http://localhost:10000',
  'http://localhost:1000'
]

const setupCORS = (app, allowedOrigins) => {
  let corsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token']
  };
  app.use(cors(corsOptions));
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });


// Pour accepter les connexions cross-domain (CORS)
/*app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});*/

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

setupCORS(app, tableauCors);

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.route(prefix + '/assignments')
  .get(assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);


app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);


//routes pour les users
app.route(prefix + '/users')
  .get(user.getUsers);

app.route(prefix + '/users/:login')
  .get(user.getUser);


//routes pour les matieres
app.route(prefix + '/matieres')
  .get(matiere.getMatieres);

app.route(prefix + '/matieres/:nom')
  .get(matiere.getMatiere);


app.use(express.static(path.join(__dirname, "./dist/assignment-app")));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./dist/assignment-app/index.html")),
);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;