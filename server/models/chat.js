'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    userId: DataTypes.INTEGER,
    chatterId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    sender_id: DataTypes.INTEGER

  }, {});
  Chat.associate = function(models) {
    // associations can be defined here
  };
  return Chat;
};
