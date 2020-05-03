const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

//Add a unique validation to the email and Employeename fields
const uniqueValidator = require('mongoose-unique-validator');

//For Employee authentication to set and validate passwords
const crypto = require('crypto');


//Employee SCHEMA
const EmployeeSchema = new Schema(
{

_id:{
    type: Number,
    unique: true
},

Employeename:{
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
    type: Mixed,
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
accountNumber:{
    type: Number,
    required: true
},
hash: String,
salt: String

},{timestamps: true});


EmployeeSchema.plugin(uniqueValidator, {message: 'is already taken.'});

//setting  passwords
EmployeeSchema.methods.setPassword = (password)=>{
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };

//validate passwords
EmployeeSchema.methods.validPassword = (password)=> {
     const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
     return this.hash === hash;
    };    

//generate a JWT
EmployeeSchema.methods.generateJWT = ()=> {
   const today = new Date();
    const exp = new Date(today);
     exp.setDate(today.getDate() + 60);
    
      return jwt.sign({
        id: this._id,
        Employeename: this.Employeename,
        exp: parseInt(exp.getTime() / 1000),
      }, secret);
    };

//get the JSON representation of a Employee for authentication
EmployeeSchema.methods.toAuthJSON = ()=>{
      return {
        Employeename: this.Employeename,
        email: this.email,
        token: this.generateJWT()
      };
    };

//Employee MODEL
const Employee =mongoose.model('employee',EmployeeSchema);

module.exports = Employee;