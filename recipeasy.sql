CREATE DATABASE recipeasy;
USE recipeasy;

CREATE TABLE recipes (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  cook_time VARCHAR(20) NOT NULL,
  servings INTEGER NOT NULL,
  ingredients VARCHAR(255) NOT NULL,
  thumbs_up BOOLEAN NOT NULL,
  author VARCHAR(100) NOT NULL,
  directions TEXT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO recipes ( title, cook_time, servings, ingredients, thumbs_up, author, directions )
   VALUES
   ( "Grilled Cheese Sandwhich", "20 minutes", 1, "Cheese, Bread, Butter", true, "Emeril", "In medium saucpan melt one tablespoon of butter. Place two slices of bread into the pan. Place cheese onto one slice of bread and place other slice of bread on top of cheese. Cook until bread is golden brown.. enjoy!"  );
