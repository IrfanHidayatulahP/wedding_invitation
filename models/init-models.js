var DataTypes = require("sequelize").DataTypes;
var _guests = require("./guests");
var _invitations = require("./invitations");
var _wishes = require("./wishes");

function initModels(sequelize) {
  var guests = _guests(sequelize, DataTypes);
  var invitations = _invitations(sequelize, DataTypes);
  var wishes = _wishes(sequelize, DataTypes);


  return {
    guests,
    invitations,
    wishes,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
