const mongoose = require('mongoose');
const Schema = mongoose.Schema.Types;
const jwt = require('jsonwebtoken');
// const secret = require('config').secret;

//Add a unique validation to the email and username fields
const uniqueValidator = require('mongoose-unique-validator');

//For user authentication to set and validate passwords
const crypto = require('crypto');


//USER SCHEMA
const UserSchema = new mongoose.Schema(
{

id:{
    type: Number,
    unique: true
},

username:{
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

blood: {
    type: String,
    required: true
},

age:{
    type: Number,
    required: true
},

phone: {
    type: Number
},
hash: String,
salt: String

},{timestamps: true});


UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

//setting User passwords
UserSchema.methods.setPassword = (password)=>{
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };

//validate passwords
UserSchema.methods.validPassword = (password)=> {
     const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
     return this.hash === hash;
    };    

//generate a JWT
UserSchema.methods.generateJWT = ()=> {
   const today = new Date();
    const exp = new Date(today);
     exp.setDate(today.getDate() + 60);
    
      return jwt.sign({
        id: this.id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
      }, secret);
    };

//get the JSON representation of a user for authentication
UserSchema.methods.toAuthJSON = ()=>{
      return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
      };
    };

//USER MODEL
const User =mongoose.model('user',UserSchema);

module.exports = User;