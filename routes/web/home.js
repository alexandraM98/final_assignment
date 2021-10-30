var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
    res.render("home/index");
});


router.get('/login', function(req, res) {
    res.render("home/login");
});


router.get('/videos', function(req, res) {
    res.render("home/videos");
});

router.get('/spiralPatientData', function(req, res) {
    res.render("home/spiralPatientData");
});

router.get('/tappingExerciseData', function(req, res) {
    res.render("home/tappingExerciseData");
});

router.get('/patientList', function(req, res) {
    res.render("home/patientList");
});

router.get('/signup', function(req, res) {
    res.render("home/signup");
});

router.get('/rawSpiralData', function(req, res) {
    res.render("home/rawSpiralData");
});

router.get('/rawTappingData', function(req, res) {
    res.render("home/rawTappingData");
});


module.exports = router;

