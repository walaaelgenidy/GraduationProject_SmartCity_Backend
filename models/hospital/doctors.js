const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

//DOCTORS SCHEMA
const DoctorsSchema = new mongoose.Schema(
    {
    
    id:{
        type: Number,
        unique: true
    },
    
    name:{
       type: String,
       lowercase: true,
       required: [true, "can't be blank"],
       match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
       index: true
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
    spicialize: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
    
    },{timestamps: true});
    
       

//DOCTORS MODEL
const Doctors =mongoose.model('doctors',DoctorsSchema);

module.exports = Doctors;