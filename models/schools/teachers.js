const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Add a unique validation to the email and Teachername fields
const uniqueValidator = require('mongoose-unique-validator');

//Teacher SCHEMA
const TeacherSchema = new Schema(
{

_id:{
    type: Number,
    unique: true
},
teachername:{
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

academicyear:{
    type:String
},
class:{
    type:Number,
    required:true
},
salary:{
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


TeacherSchema.plugin(uniqueValidator, {message: 'is already taken.'});


//Teacher MODEL
const Teacher =mongoose.model('teacher',TeacherSchema);

module.exports = Teacher;