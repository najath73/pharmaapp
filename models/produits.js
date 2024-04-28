const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProduitSchema = new Schema({
    nom: {
        type: String
    },
    composant: {
        type: String
    },
    prix: {
        type: Number
    },
    categorie: {
        type: String
    }
});


module.exports = ProduitSchema;
