// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  // GET route for getting all of the posts
  app.get("/api/recipes/", function(req, res) {
    db.Recipe.findAll({})
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });
 

  // Get route for returning posts of a specific category
  app.get("/api/recipes/category/:category", function(req, res) {
    db.Recipe.findAll({
      where: {
        category: req.params.category
      }
    })
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/recipes/:id", function(req, res) {
    db.Recipe.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // POST route for saving a new post
  app.post("/api/recipes", function(req, res) {
    console.log(req.body);
    db.Recipe.create(
      req.body
    //{
      //title: req.body.title,
      //body: req.body.body,
      //category: req.body.category
    //}
    )
    .then(function(dbRecipe) {
      res.redirect("/");
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // PUT route for updating posts
  app.put("/api/recipes", function(req, res) {
    db.Recipe.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });
};
