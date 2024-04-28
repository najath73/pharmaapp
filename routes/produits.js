var express = require('express');
var produitsRouter = express.Router();
const { authenticateToken } = require('../middlewares/auth'); // Importer le middleware d'authentification
const Pharmacie = require('../models/pharmacies');


// Route pour obtenir tous les produits d'une pharmacie
produitsRouter.get('/pharmacies/:pharmacieId/produits', async (req, res) => {
  try {
      const pharmacie = await Pharmacie.findById(req.params.pharmacieId); // Rechercher la pharmacie par son ID
      if (!pharmacie) {
          return res.status(404).send({ message: "Pharmacie introuvable" });
      }
      res.json(pharmacie.produits); // Renvoyer les produits de la pharmacie
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Route pour ajouter un produit à une pharmacie
produitsRouter.post('/pharmacies/:pharmacieId/produits', authenticateToken, async (req, res) => {
  try {
      const pharmacie = await Pharmacie.findById(req.params.pharmacieId); // Rechercher la pharmacie par son ID
      if (!pharmacie) {
          return res.status(404).send({ message: "Pharmacie introuvable" });
      }
      pharmacie.produits.push(req.body); // Ajouter le nouveau produit à la liste des produits de la pharmacie
      await pharmacie.save(); // Sauvegarder les modifications
      res.status(201).send(pharmacie.produits);
  } catch (err) {
      res.status(400).send({ message: err.message });
  }
});

// Route pour supprimer un produit d'une pharmacie
produitsRouter.delete('/pharmacies/:pharmacieId/produits/:produitId', authenticateToken, async (req, res) => {
  try {
      const pharmacie = await Pharmacie.findById(req.params.pharmacieId); // Rechercher la pharmacie par son ID
      if (!pharmacie) {
          return res.status(404).send({ message: "Pharmacie introuvable" });
      }
      pharmacie.produits.id(req.params.produitId).remove(); // Supprimer le produit de la liste des produits de la pharmacie
      await pharmacie.save(); // Sauvegarder les modifications
      res.send(pharmacie.produits);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Route pour obtenir un produit par son ID à partir d'une pharmacie
produitsRouter.get('/pharmacies/:pharmacieId/produits/:produitId', async (req, res) => {
  try {
      const pharmacie = await Pharmacie.findById(req.params.pharmacieId); // Rechercher la pharmacie par son ID
      if (!pharmacie) {
          return res.status(404).json({ message: "Pharmacie introuvable" });
      }
      const produit = pharmacie.produits.id(req.params.produitId); // Trouver le produit dans la liste des produits de la pharmacie par son ID
      if (!produit) {
          return res.status(404).send({ message: "Produit introuvable" });
      }
      res.json(produit);
  } catch (err) {
      res.status(500).send({ message: err.message });
  }
});

// Route pour mettre à jour un produit par son ID à partir d'une pharmacie
produitsRouter.put('/pharmacies/:pharmacieId/produits/:produitId', authenticateToken, async (req, res) => {
  try {
      const pharmacie = await Pharmacie.findById(req.params.pharmacieId); // Rechercher la pharmacie par son ID
      if (!pharmacie) {
          return res.status(404).json({ message: "Pharmacie introuvable" });
      }
      const produit = pharmacie.produits.id(req.params.produitId); // Trouver le produit dans la liste des produits de la pharmacie par son ID
      if (!produit) {
          return res.status(404).json({ message: "Produit introuvable" });
      }
      produit.set(req.body); // Mettre à jour les propriétés du produit avec les données de la requête
      await pharmacie.save(); // Sauvegarder les modifications
      res.json(produit);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});



module.exports = produitsRouter;
