var DataTypes = require("sequelize").DataTypes;
var _guests = require("./guests");
var _invitations = require("./invitations");

function initModels(sequelize) {
  var guests = _guests(sequelize, DataTypes);
  var invitations = _invitations(sequelize, DataTypes);


  return {
    guests,
    invitations,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
