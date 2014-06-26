var expect=require('chai').expect;
var User=require('../../models/user');
var bc=require('bcrypt');


describe("User Model",function(){
  it("should encrypt password",function(){
    var u = new User();
    u.setPassword('password');
    expect(bc.compareSync('password',u.attributes.password)).to.be.true;
  });
  it("should authenticate user",function() {
    var u = new User();
    u.set({username: "vagmi@example.com"});
    u.setPassword("password");
    expect(u.authenticate("vagmi@example.com","wrong")).to.be.false;
    expect(u.authenticate("vagmi@example.com","password")).to.be.true;
  });
});
