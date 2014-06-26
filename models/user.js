var redis = require('./redis').client;
var _ = require('lodash');
var Utils = require('./utils');
var uuid = require('node-uuid');
var bc = require('bcrypt');
var Model = require('./base').Model;

var User=Model.create('User');

User.prototype.setPassword = function(password) {
  var salt = bc.genSaltSync(10);
  var encryptedPassword = bc.hashSync(password,salt);
  this.attributes.password=encryptedPassword;
};
User.prototype.authenticate = function(username,password) {
  var sameUser = (username==this.attributes.username);
  var samePassword = bc.compareSync(password,this.attributes.password);
  return sameUser && samePassword;
};
module.exports=User;
