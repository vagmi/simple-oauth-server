var expect=require('chai').expect;
var redis=require('../../models/redis').client;
var Model=require('../../models/base').Model;

describe("Model Base",function() {
  var Entity;
  beforeEach(function() {
    redis.flushdb();
    Entity=Model.create('Entity');
  });
  it("should create an Entity",function() {
    expect(Entity.find).not.to.be.null;
    expect(Entity.modelName).to.equal("Entity");
  });
  it("should set id attribute",function() {
    var obj = new Entity();
    expect(obj.attributes.id).not.to.be.null;
  });
  it("should set attributes",function() {
    var obj = new Entity();
    obj.set({a: 20});
    expect(obj.attributes.a).to.be.equal(20);
  });
  it("should find objects for entity",function(done) {
    redis.hmset("Entity_testid","id","testid","name","entity1",
      function(err,obj) {
        var obj=Entity.find("testid",function(err,obj) {
          expect(err).to.be.null;
          expect(obj.attributes.id).to.equal("testid");
          expect(obj.attributes.name).to.equal("entity1");
          expect(obj.set).not.to.be.null;
          done(err);
        });
      });
  });
  it("should save entity objects",function(done) {
    var obj = new Entity({name: "Client1"});
    obj.save(function(err,obj){
      redis.hgetall("Entity_"+obj.attributes.id,function(err,robj){
        expect(robj.id).to.equal(obj.attributes.id);
        expect(robj.name).to.equal(obj.attributes.name);
        done(err);
      });
    });
  });
});
