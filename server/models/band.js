'use strict';
module.exports = (sequelize, DataTypes) => {
  const band = sequelize.define('band', {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    song: DataTypes.STRING,
    img: DataTypes.STRING,
    audio: DataTypes.STRING
  }, {});
  band.associate = function(models) {
    // associations can be defined here
  };
  return band;
};
