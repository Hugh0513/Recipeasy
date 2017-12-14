module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    discription: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
    cookTime: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [1]
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: true,
      len: [1]
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    directions: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    thumbsUp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      len: [1]
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Personal"
    }
  });

  Post.associate = function(models) {
    // We're saying that a Recipe should belong to an Author
    // A Recipe can't be created without an Author due to the foreign key constraint
    Post.belongsTo(models.Author, {
      foreignKey: {
        allowNull: false
      }
    });

  };

  return Post;
};
