const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const Database = require('./config/database');
//  const methodOverride = require('method-override');

const app = express();

//  mongoose.connect('mongodb://localhost/users',{useNewUrlParser: true,useUnifiedTopology: true});
//  mongoose.connect('mongodb://localhost/custmers',{useNewUrlParser: true,useUnifiedTopology: true});
//  mongoose.connect('mongodb://localhost/employees',{useNewUrlParser: true,useUnifiedTopology: true});
//  mongoose.connect('mongodb://localhost/doctors',{useNewUrlParser: true,useUnifiedTopology: true});
//  mongoose.connect('mongodb://localhost/patients',{useNewUrlParser: true,useUnifiedTopology: true});
//  mongoose.connect('mongodb://localhost/students',{useNewUrlParser: true,useUnifiedTopology: true});
//  mongoose.connect('mongodb://localhost/teachers',{useNewUrlParser: true,useUnifiedTopology: true});
 const URL = 
 "mongodb+srv://walaagamal:<walaa@1997>@citycluster-ltvmp.mongodb.net/test?retryWrites=true&w=majority";
 const Database = async ()=> {
     
        await mongoose.connect( URL , 
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          })
          .then(() => {
             console.log('connected to database');
          })
          .catch(error => {
             //MongooseServerSelectionError MongooseError [MongooseServerSelectionError]: Authentication failed
             console.log("Error", error)
          });
    }
  Database();
  module.exports = Database;

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride());

app.use('/api', require('./routes/api'));

app.listen(process.env.port || 4000 ,()=>{
console.log('listing to requests');
});