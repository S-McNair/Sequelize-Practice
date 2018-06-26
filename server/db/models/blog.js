'use strict';
module.exports = (sequelize, DataTypes) => {
  var Blog = sequelize.define('Blog', {
    authorId: { type: DataTypes.INTEGER },
    title: DataTypes.STRING,
    article: DataTypes.TEXT,
    featured: DataTypes.BOOLEAN,
    published: DataTypes.DATE
    // authorID: DataTypes.INTEGER
  }, {});
  Blog.associate = function(models) {
    // associations can be defined here
    models.Blog.belongsTo(models.Author, { foreignKey: 'authorId', targetKey: 'id' });
    // models.Blog.belongsTo(models.Author, { foreignKey: 'authorId' });
  };
  return Blog;
};
