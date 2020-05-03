const express = require('express');
const router = express.Router();

const User = require('../models/users');
const Custmers = require('../models/bank/custmers');
const Employee = require('../models/bank/employees');
const Doctors = require('../models/hospital/doctors');
const Patients = require('../models/hospital/patients');
const Student = require('../models/schools/students');
const Teacher = require('../models/schools/teachers');

const Database = require('database');

//get request
router.get(['/users','/bank/custmers', '/bank/employees','/hospital/doctors', '/hospital/patients','/schools/students','/schools/teachers'], (req,res)=>{
    res.send({type:'GET'});

    // use mongoose to get all todos in the database
	User.find(function(err, user) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.json(user); // return all user in JSON format
    });
    
	Employee.find(function(err, employee) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.json(employee); // return all employees in JSON format
    });
    
	Custmers.find(function(err, custmers) {
		// if there is an error retrieving, send the error otherwise send data
		if (err)
			res.send(err)
		res.json(custmers); // return all employees in JSON format
    });
    
    Doctors.find(function(err, doctors) {
      // if there is an error retrieving, send the error otherwise send data
        if (err)
        res.send(err)
      res.json(doctors); // return all Doctors in JSON format
    });

    Patients.find(function(err, patients) {
      // if there is an error retrieving, send the error otherwise send data
      if (err)
        res.send(err)
      res.json(patients); // return all patients in JSON format
    });

    Student.find(function(err, student) {
      // if there is an error retrieving, send the error otherwise send data
      if (err)
        res.send(err)
    res.json(student); // return all Students in JSON format
    });

    Teacher.find(function(err, teacher) {
      // if there is an error retrieving, send the error otherwise send data
     if (err)
        res.send(err)
    res.json(teacher); // return all Teachers in JSON format
    });


 });

//post request
router.post(['/users','/bank/custmers', '/bank/employees','/hospital/doctors', '/hospital/patients','/schools/students','/schools/teachers'], (req,res)=>{
   
    User.create(req.body).then((user)=>{
         res.send(user);
         // get and return all the employees after newly created employe record
         User.find((err, user)=> {
			if (err)
				res.send(err)
			res.json(user);
		});
	
    });

    Custmers.create(req.body).then((custmers)=>{
         res.send(custmers);
         Custmers.find((err, custmers)=> {
			if (err)
				res.send(err)
			res.json(custmers);
		});
    });

    Employee.create(req.body).then((employee)=>{
          res.send(employee);
		Employee.find((err, employee)=> {
			if (err)
				res.send(err)
			res.json(employee);
		});
    });

    Teacher.create(req.body).then((teacher)=>{
        res.send(teacher);
		Teacher.find((err, teacher)=> {
			if (err)
				res.send(err)
			res.json(teacher);
		});
    });

     Student.create(req.body).then((student)=>{
        res.send(student);
		Student.find((err, student)=> {
			if (err)
				res.send(err)
			res.json(student);
		});
    });

     Doctors.create(req.body).then((doctors)=>{
        res.send(doctors);
		Doctors.find((err, doctors)=> {
			if (err)
				res.send(err)
			res.json(doctors);
		});
    });

     Patients.create(req.body).then((patients)=>{
        res.send(patients);
		Patients.find((err, patients)=> {
			if (err)
				res.send(err)
			res.json(patients);
		});
    });
           
});

//put request 
router.put(['/users/:id','/bank/custmers/:id', '/bank/employees/:id','/hospital/doctors/:id', '/hospital/patients/:id','/schools/students/:id','/schools/teachers/:id'], (req,res)=>{
 
    // create mongose method to update a existing record into collection
    let id = req.params.id;
    res.send({type:'PUT'});

        // save the user
    	User.findByIdAndUpdate(id,  (err, user)=> {
        if (err) throw err;
       res.send('Successfully! User updated - '+user.name);
        });

        // save the user
    	Custmers.findByIdAndUpdate(id,  (err, custmers)=> {
         if (err) throw err;
        res.send('Successfully! Custmers updated - '+custmers.name);
        });

        // save the user
    	Employee.findByIdAndUpdate(id,  (err, employee)=> {
        if (err) throw err;
        res.send('Successfully! Employee updated - '+employee.name);
        });

        // save the user
        Patients.findByIdAndUpdate(id,  (err, patients)=> {
        if (err) throw err;
        res.send('Successfully! Patients updated - '+patients.name);
        });


        // save the user
        Doctors.findByIdAndUpdate(id,  (err, doctors)=> {
        if (err) throw err;
        res.send('Successfully! Doctors updated - '+doctors.name);
        });

        // save the user
    	Student.findByIdAndUpdate(id,  (err, student)=> {
        if (err) throw err;
        res.send('Successfully! Student updated - '+student.name);
        });

        // save the user
        Teacher.findByIdAndUpdate(id,  (err, teacher)=> {
        if (err) throw err;
        res.send('Successfully! Teacher updated - '+teacher.name);
        });

    });

//delete requst
router.delete(['/users/:id','/bank/custmers/:id', '/bank/employees/:id','/hospital/doctors/:id', '/hospital/patients/:id','/schools/students/:id','/schools/teachers/:id'], (req,res)=>{
    console.log(req.params.id);
    let id = req.params.id;

     User.remove({
		_id : id
	}, (err)=> {
		if (err)
			res.send(err);
		else
			res.send('Successfully! User has been Deleted.');	
    });

    Custmers.remove({
		_id : id
	}, (err)=> {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Custmers has been Deleted.');	
    });

    Employee.remove({
		_id : id
	}, (err)=> {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Employee has been Deleted.');	
    });

    Teacher.remove({
		_id : id
	}, (err)=> {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Teacher has been Deleted.');	
    });

    Student.remove({
		_id : id
	}, (err)=> {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Student has been Deleted.');	
    });

    Doctors.remove({
		_id : id
	}, (err)=> {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Doctors has been Deleted.');	
    });
    
    Patients.remove({
		_id : id
	}, (err)=> {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Patients has been Deleted.');	
    });
    

});

module.exports = router;



