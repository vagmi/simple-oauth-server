var express=require('express'),
    oauthserver=require('node-oauth2-server'),
    path=require('path'),
    cookieParser=require('cookie-parser'),
    session=require('cookie-session'),
    bodyParser=require('body-parser'),
    methodOverride=require('method-override'),
    model=require('./model');
var app=express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieParser('ncie0fnft6wjfmgtjz8i'));
app.use(session({
  keys: ['key1', 'key2'],
  secureProxy: true // if you do SSL outside of node
}));
app.use(bodyParser());
app.use(methodOverride());
app.oauth = oauthserver({
  model: model,
  grants: ['token'],
  debug: true
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res,next){
  res.send('bye world');
});
app.get('/oauth/authorize',function(req,res,next) {
  res.render('authorize');
});
app.post('/oauth/authorize',app.oauth.authCodeGrant(function(req,next){
  next(null,true,model.users[0],null);
}));
app.listen(5000);
