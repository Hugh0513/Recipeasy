var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var db = require("../models");
// Requiring our Todo model


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.Recipe.all({})
    .then(function(dbRecipe) {
    
    var hbsObject = {
      recipes : dbRecipe
    };
    // var testObj = res.json(hbsObject);
    
    res.render("index", hbsObject);
  });


    
  });



router.get("/search", function(req, res) {
  // db.Recipe.findAll(function(data) {
  //   console.log(data);
  //     var hbsObject = data;
  //     console.log(hbsObject);
      
  //   });
    res.render("search", res);
  });

router.get("/add", function(req, res) {
  // db.Recipe.findAll(function(data) {
  //   console.log(data);
  //     var hbsObject = data;
  //     console.log(hbsObject);
      
  //   });
    res.render("add", res);
  });

module.exports = router;