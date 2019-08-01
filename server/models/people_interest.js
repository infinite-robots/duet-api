'use strict';
module.exports = (sequelize, DataTypes) => {
  const people_interest = sequelize.define('people_interest', {
    user_id: DataTypes.INTEGER,
    other_user_id: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN,
    matched: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  people_interest.associate = function(models) {
    // associations can be defined here
  };
  return people_interest;
};