'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
