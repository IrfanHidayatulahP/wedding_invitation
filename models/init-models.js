var DataTypes = require("sequelize").DataTypes;
var _invitations = require("./invitations");

function initModels(sequelize) {
  var invitations = _invitations(sequelize, DataTypes);


  return {
    invitations,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
