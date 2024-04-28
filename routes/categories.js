var express = require('express');
var categoriesRouter = express.Router();

var categories = [
    {
      id: 1,
      nom: "astou"
    },
    {
      id: 2,
      nom: "Nouni"
    }
  ]

  // Get toutes les categories
  categoriesRouter.get('/', function(req, res, next) {
    
    res.send(categories)
  });
  
  
  // Get categorie by id 
  categoriesRouter.get('/:id', function(req, res, next) {
    let id = req.params.id
    categorie = categories.find(function(categorie) {
      return categorie.id == id;
    });
    res.send(categorie)
  });
  

module.exports = categoriesRouter;
