const mongoose = require('mongoose');
// const Schema = mongoose.Schema;


//Add a unique validation to the email and studentname fields
const uniqueValidator = require('mongoose-unique-validator');

//student SCHEMA
const StudentSchema = new mongoose.Schema(
{

id:{
    type: Number,
    unique: true
},

studentname:{
   type: String,
   lowercase: true,
   unique: true,
   required: [true, "can't be blank"],
   match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
   index: true
   },

address:{
   type: String,
},

subjects: {
    type: String,
    required: true
},

age:{
    type: Number,
    required: true
},
degrees: {
    type: Number,
    required: true
},
academicyear:{
    type:String
},
class:{
    type:Number,
    required:true
},
expenses:{
    type:Number,
    required:true
},
tabels:{
    type:String,
    required:true
},

phone: {
    type: Number
},
hash: String,
salt: String

},{timestamps: true});


StudentSchema.plugin(uniqueValidator, {message: 'is already taken.'});



//Student MODEL
const Student =mongoose.model('student',StudentSchema);

module.exports = Student;