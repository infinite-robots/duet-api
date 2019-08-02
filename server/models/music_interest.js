'use strict';
module.exports = (sequelize, DataTypes) => {
  const music_interest = sequelize.define('music_interest', {
    user_id: DataTypes.INTEGER,
    band_id: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    liked: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE
  }, {});
  music_interest.associate = function(models) {
    // associations can be defined here
  };
  return music_interest;
};