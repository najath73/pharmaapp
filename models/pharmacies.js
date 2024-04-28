const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProduitSchema = require('./produits');


const pharmacieSchema = new Schema({
    nom: {
        type: String
    },
    adresse: {
        type: String
    },
    telephone: {
        type: String
    },
    produits: [ProduitSchema]
});


module.exports = mongoose.model('Pharmacie', pharmacieSchema);
