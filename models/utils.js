var _ = require('lodash');
var Utils = {};
Utils.toArray = function(obj) {
  return _.flatten(_.pairs(obj));
};
module.exports=Utils;
