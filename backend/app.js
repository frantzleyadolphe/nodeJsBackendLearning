const express = require("express");
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');
mongoose.set('strictQuery', true);
const app = express();



mongoose.connect('mongodb+srv://frantzleyadolphe:VUa8UWJBCNHp17m8@cluster0.t4f9ays.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error("connection error", err));

// Pour gérer la requête POST venant de l'application front-end, on a besoin 
// d'en extraire le corps JSON. Pour cela, vous avez juste besoin d'un middleware 
// très simple, mis à disposition par le framework Express.
// Juste après la déclaration de la constante  app  , ajoutez :
app.use(express.json());

// Ces headers permettent :
// d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
// d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
// d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;
