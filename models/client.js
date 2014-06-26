var Model = require('./base').Model;
var Client=Model.create('Client');

Client.prototype.authenticate = function(client_id,client_secret) {
  var self=this;
  return (self.attributes.client_id===client_id) && (self.attributes.client_secret===client_secret);
}

module.exports=Client;
