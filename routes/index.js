var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

//Doctor schema
var doctorSchema= mongoose.Schema({
    name:  String,
    speciality: String,
});
//Doctor model
var Doctor=mongoose.model('Doctor', doctorSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
    Doctor.find({}, function(err, doctors){
        if(err){
            console.log(err);
        } else {
            res.render('index', {
                title:'Articles',
                doctors: doctors
            });
        }
    });
});

router.get('/get-doctors',function(req, res, next) {

    res.render('index', {doctors:doctors});
});

router.post('/insertDoctor',function(req, res, next) {
    var docName=req.body.name;
    var docSpeciality=req.body.speciality;
    var doctor=new Doctor({name:docName,speciality:docSpeciality});
    doctor.save();
    console.log(docName+docSpeciality);
    res.redirect('/');
});

router.post('/updateDoctor',function(req, res, next) {
    Doctor.findByIdAndUpdate(req.body.id, { $set: { speciality: req.body.speciality, name:req.body.name }}, { new: true }, function (err, tank) {
        if (err) return handleError(err);
        res.send(tank);
    });
    res.redirect('/');
});

module.exports = router;
