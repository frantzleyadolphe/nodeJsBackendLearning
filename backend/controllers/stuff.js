const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  delete thingObject._userId;
  const thing = new Thing({
      ...thingObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  thing.save()
  .then(() => { console.log(thingObject);res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(500).json( { error })})
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// JSON.parse() transforme un objet stringifié en Object JavaScript exploitable.

// Vous aurez besoin dereq.protocol  et de req.get('host'), connectés par  '://'  
// et suivis de req.file.filename, pour reconstruire l'URL complète du fichier enregistré.

// Configurez votre serveur pour renvoyer des fichiers statiques pour une route donnée avec  
// express.static()  et  path.join().

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ? {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete thingObject._userId;
  Thing.findOne({_id: req.params.id})
      .then((thing) => {
        //verify to be a owner of the thing else return status code 200 to frontend
          if (thing.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
            //update thing object on database
              Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              //sending error's message to frontend
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};