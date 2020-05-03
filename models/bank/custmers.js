const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
// const secret = require('config').secret;

//Add a unique validation to the email and name fields
const uniqueValidator = require('mongoose-unique-validator');

//For user authentication to set and validate passwords
const crypto = require('crypto');


//Customers SCHEMA
const CustomersSchema = new mongoose.Schema(
{

id:{
    type: Number,
    unique: true
},

name:{
   type: String,
   lowercase: true,
   unique: true,
   required: [true, "can't be blank"],
   match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
   index: true
   },

email:{
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
},

password:{
    type: Number,
    required: [true],
    index: true,
},

address:{
   type: String,
},

position: {
    type: String,
},

age:{
    type: Number,
    required: true
},

phone: {
    type: Number
},
accountType:
{
    type: String,
    required: true
},
balance:{
    type: Number,
    required: true
},
hash: String,
salt: String

},{timestamps: true});


CustomersSchema.plugin(uniqueValidator, {message: 'is already taken.'});

//setting Customers passwords
CustomersSchema.methods.setPassword = (password)=>{
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };

//validate passwords
CustomersSchema.methods.validPassword = function(password) {
     const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
     return this.hash === hash;
    };    

//generate a JWT
CustomersSchema.methods.generateJWT = function() {
   const today = new Date();
    const exp = new Date(today);
     exp.setDate(today.getDate() + 60);
    
      return jwt.sign({
        id: this.id,
        name: this.name,
        exp: parseInt(exp.getTime() / 1000),
      }, secret);
    };

//get the JSON representation of a user for authentication
CustomersSchema.methods.toAuthJSON = function(){
      return {
        name: this.name,
        email: this.email,
        token: this.generateJWT()
      };
    };

//Customers MODEL
const Customers =mongoose.model('customers',CustomersSchema);

module.exports = Customers;