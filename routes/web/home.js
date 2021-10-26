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

router.get('/news', function(req, res) {
    res.render("home/news");
});

router.get('/signup', function(req, res) {
    res.render("home/signup");
});

router.get('/patientProfile', function(req, res) {
    res.render("home/patientProfile");
});


module.exports = router;

