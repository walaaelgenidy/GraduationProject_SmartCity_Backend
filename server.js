const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Database = require('./config/database');
const methodOverride = require('method-override');

const app = express();

mongoose.connect('mongodb://localhost/users');
mongoose.connect('mongodb://localhost/custmers');
mongoose.connect('mongodb://localhost/employees');
mongoose.connect('mongodb://localhost/doctors');
mongoose.connect('mongodb://localhost/patients');
mongoose.connect('mongodb://localhost/students');
mongoose.connect('mongodb://localhost/teachers');


mongoose.connect(database.url);
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use('/api', require('./routes/api'));


Database();

app.listen(process.env.port || 4000 ,()=>{
console.log('listing to requests');
});

