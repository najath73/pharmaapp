var express = require('express');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');


//Import router
var usersRouter = require('./routes/users');
var pharmacieRouter = require('./routes/pharmacies');
var produitsRouter = require('./routes/produits');
var categoriesRouter = require('./routes/categories');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();
 

//DB connection 
mongoose.connect("mongodb+srv://najathlawani73:QbJJXgG06MhCg02z@cluster0.4kgjy6f.mongodb.net/pharmaDB");

mongoose.set('debug', true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


//Routers
app.use('/api', usersRouter);
app.use('/api', pharmacieRouter);
app.use('/api', produitsRouter);
app.use('/api', authRouter);
app.use('/api', categoriesRouter);



module.exports = app;
