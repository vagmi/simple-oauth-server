var redis = require('./redis').client;
var _ = require('lodash');
var Utils = require('./utils');
var uuid = require('node-uuid');

var Model=function() {
}
Model.prototype.set = function(attributes) {
  _.extend(this.attributes,attributes);
};
Model.prototype.save = function(callback) {
  var self=this;
  var attrs= Utils.toArray(this.attributes);
  attrs.unshift(self.__proto__.constructor.modelName+"_"+this.attributes.id);
  attrs.push(function(err,result){
    self.__proto__.constructor.find(self.attributes.id,callback);
  });
  redis.hmset.apply(redis,attrs);
}
Model.find = function(id,callback) {
  var self=this;
  redis.hgetall(self.modelName+"_"+id,function(err,results) {
    var obj= new (self);
    obj.set(results);
    callback(null,obj);
  });
}
Model.create = function(name) {
  var ctor = function(attrs) {
    this.attributes = this.attributes || {};
    this.attributes.id=uuid.v4();
    _.extend(this.attributes,attrs);
    Model.prototype.constructor.apply(this,arguments);
  }
  ctor.modelName=name;
  _.extend(ctor,Model);
  ctor.prototype=_.clone(Model.prototype);
  ctor.prototype.constructor=ctor;
  ctor.find=_.bind(Model.find,ctor);
  return ctor;
};
exports.Model=Model;
