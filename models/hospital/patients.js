const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

//PATIENTS SCHEMA
const PatientsSchema = new mongoose.Schema(
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
   
    gender:{
       type: String,
       required: true
    },
    maritalStatus:{
        type: String,
    
    },

    address:{
       type: String,
    },
    
    medicalHistory: {
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
    blood: {
        type: String,
        required: true
    },
    diseaseType:{
        type: String,
        required: true
    },
    hash: String,
    salt: String
    
    },{timestamps: true});
    
       

//patients MODEL
const Patients =mongoose.model('patients',PatientsSchema);

module.exports = Patients;