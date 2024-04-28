const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    motDePasse: {
        type: String,
        required: true
    },
    dateInscription: {
        type: Date,
        default: Date.now // La date d'inscription est définie par défaut à la date actuelle
    }
});

const UserModel = mongoose.model('User', UsersSchema);

module.exports = UserModel;
