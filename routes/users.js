var express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users'); // Importer le modèle d'utilisateur
const { authenticateToken } = require('../middlewares/auth'); // Importer le middleware d'authentification
var usersRouter = express.Router();

// Route pour obtenir tous les utilisateurs
usersRouter.get('/users', authenticateToken, async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Route pour obtenir un utilisateur par son ID 
usersRouter.get('/users/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Route pour créer un nouvel utilisateur
usersRouter.post('/users', async (req, res) => {
  const user = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      motDePasse: await bcrypt.hash(req.body.motDePasse, 10)
  });

  try {
      const newUser = await user.save();
      res.status(201).json(newUser);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// Route pour mettre à jour un utilisateur
usersRouter.put('/users/:id', getUser, async (req, res) => {
  if (req.body.nom != null) {
      res.user.nom = req.body.nom;
  }
  if (req.body.prenom != null) {
    res.user.prenom = req.body.prenom;
  }
  if (req.body.email != null) {
      res.user.email = req.body.email;
  }
  if (req.body.motDePasse != null) {
      res.user.motDePasse = req.body.motDePasse;
  }
  try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// Route pour supprimer un utilisateur
usersRouter.delete('/users/:id', getUser, async (req, res) => {
  try {
      await res.user.remove();
      res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

//Une fonction que je reutilise
async function getUser(req, res, next) {
  let user;
  try {
      user = await User.findById(req.params.id);
      if (user == null) {
          return res.status(404).json({ message: "Utilisateur introuvable" });
      }
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}
module.exports = usersRouter;
