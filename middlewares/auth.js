const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Fichier de configuration pour les clés secrètes

// Middleware pour vérifier le jeton d'authentification
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Récupérer le jeton depuis le header Authorization
    if (token == null) {
        return res.status(401).json({ message: "Authentification requise" });
    }
    
    jwt.verify(token, config.jwtSecretKey, (err, user) => {

        console.log(token)
        console.log(err)
        if (err) {
            return res.status(403).json({ message: "Accès interdit" });
        }
        req.user = user; // Stocker les informations de l'utilisateur dans l'objet de requête
        next();
    });
}

module.exports = { authenticateToken };