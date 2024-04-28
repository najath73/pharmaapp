var express = require('express');
var pharmacieRouter = express.Router();
const { authenticateToken } = require('../middlewares/auth'); // Importer le middleware d'authentification
var Pharmacie = require('../models/pharmacies');



// Get toutes les pharmacies 
pharmacieRouter.get('/pharmacies', async function (req, res, next) {
  
  res.send(await Pharmacie.find())
});

// Post une  pharmacie 
pharmacieRouter.post('/pharmacies', authenticateToken, async function (req, res, next) {


  var item = new Pharmacie(req.body);

  await item.save();

  res.status(201).send(item);
});
  

// Get pharmacie by id 
pharmacieRouter.get('/pharmacies/:id', async function(req, res, next) {
  
  res.send(await Pharmacie.findById(req.params.id)) 
});

//Modifier  une pharmacie 
pharmacieRouter.put('/pharmacies/:id', authenticateToken, async(req, res) => {
  try {
      res.status(200).send( await Pharmacie.updateOne({ _id: (req.params.id) }, data))
  } catch (e) {
      res.status(400)
      res.send('Database Error')
      console.error(e)
  }

})

//Supprimer une pharmacie 
pharmacieRouter.delete('/:id', authenticateToken, async(req, res) => {
  try {
      res.status(200).send(await Pharmacie.deleteOne({ _id: req.params.id }))
  } catch (e) {
      res.status(400)
      res.send('Database Error')
      console.error(e)
  }

})


// Endpoint pour effectuer une recherche de produits
pharmacieRouter.get('/pharmacies/rechercher', async (req, res) => {
  const termeRecherche = req.query.q; // Récupérer le terme de recherche depuis le paramètre de requête 'q'

  try {
      // Effectuer la recherche de produits dans les pharmacies
      const pharmacies = await Pharmacie.find({
          "produits.nom": { $regex: new RegExp(termeRecherche, "i") } // Recherche insensible à la casse
      });

      res.json(pharmacies);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = pharmacieRouter;
