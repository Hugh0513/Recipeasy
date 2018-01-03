var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
 
  var Recipe = sequelize.define("Recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    cook_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        len: [1]
      }
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        len: [1]
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    thumbs_up: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: 
      {
        len: [1]
      }
    },
    thumbs_down: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: 
      {
        len: [1]
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      }
    }
    
    // category: {
    //   type: DataTypes.STRING,
    //   defaultValue: "Uncategorized"
    // }

},
    {
    timestamps: false
    }
  );

  // Recipe.associate = function(models) {
  //   // We're saying that a Recipe should belong to an Author
  //   // A Recipe can't be created without an Author due to the foreign key constraint
  //   Recipe.belongsTo(models.Author, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Recipe;
};
