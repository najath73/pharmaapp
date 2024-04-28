const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategoriesSchema = new Schema({
    categorie: {
        type: String
    },
    description: {
        type: String
    },
});


const CategorieModel = mongoose.model('Pharmacie', CategoriesSchema);

module.exports = CategorieModel;
