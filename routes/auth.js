const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Importer le modèle d'utilisateur
const config = require('../config/config'); // Fichier de configuration pour les clés secrètes

// Endpoint pour l'authentification (login)
router.post('/login', async (req, res) => {
    console.log("START")
    const { email, motDePasse } = req.body;
    console.log(req.body)

    try {
        // Vérifier si l'utilisateur existe dans la base de données
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        // Vérifier si le mot de passe est correct
        if (!await bcrypt.compare(motDePasse, user.motDePasse)) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }


        // Générer un jeton JWT
        const token = jwt.sign({ id: user._id, email: user.email }, config.jwtSecretKey, { expiresIn: '1h' });

        // Renvoyer le jeton JWT
        res.send(token );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
