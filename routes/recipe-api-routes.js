// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/recipes/", function(req, res) {
    db.Recipe.findAll({})
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });
 
  // GET route for getting all of the posts order by thumbs_up
  app.get("/api/recipes/order", function(req, res) {
    db.Recipe.findAll({
      order:[['thumbs_up', 'DESC']],
      limit: 5
    })
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


  // Get route for returning posts of a specific category
  var Sequelize = require('sequelize');
  const Op = Sequelize.Op;
  app.get("/api/recipes/title/:recipe", function(req, res) {
    var searchStr = "%" + req.params.recipe + "%"
    db.Recipe.findAll({
      where: {
        title: {
          [Op.like]: searchStr
        }
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
      res.redirect("/manage"); // go back to manage.html
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

  // update LIKE
  app.put("/api/recipes/like/:id", function(req, res) {
    db.Recipe.increment("thumbs_up",
      {
        where: {
          id: req.params.id
        }
      })
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // update LIKE(cancel)
  app.put("/api/recipes/cancelLike/:id", function(req, res) {
    db.Recipe.increment({"thumbs_up": -1 }, //decrement doesn't work
      {
        where: {
          id: req.params.id
        }
      })
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // update DISLIKE
  app.put("/api/recipes/dislike/:id", function(req, res) {
    db.Recipe.increment("thumbs_down",
      {
        where: {
          id: req.params.id
        }
      })
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });

  // update DISLIKE(cancel)
  app.put("/api/recipes/cancelDislike/:id", function(req, res) {
    db.Recipe.increment({"thumbs_down": -1 }, //decrement doesn't work
      {
        where: {
          id: req.params.id
        }
      })
    .then(function(dbRecipe) {
      res.json(dbRecipe);
    });
  });
};
