var expect=require('chai').expect;
var Client=require('../../models/client');


describe("Client Model",function(){
  it("should authenticate client",function() {
    var c = new Client({client_id: "client1", client_secret: "Secret"});
    expect(c.authenticate("client1","Secret")).to.be.true;
    expect(c.authenticate("client1","WrongSecret")).to.be.false;
  });
});
