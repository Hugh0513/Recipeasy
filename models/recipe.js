var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
 
  var Recipe = sequelize.define("Recipe", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,30]
      }
    },
    cook_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        len: [1,5]
      }
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        len: [1,5]
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1,300]
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
        len: [1,20]
      }
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1,300]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,300]
      }
    }
    
    // category: {
    //   type: DataTypes.STRING,
    //   defaultValue: "Uncategorized"
    // }

  },
  {
    timestamps: false
  });

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
