const express = require("express");
const app = express();
var exphbs   = require('express-handlebars');
var path     = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helpers = require('./helpers');
const config = require('./models/config.json');
const db = require('./models')(Sequelize, config);
const authCookie = '__sso_token';
const authCookie1 = '__service_token';
const urlencodedParser = bodyParser.urlencoded({extended: false});
const busRouter = require("./routes/busRouter.js");
var Route = require('./Models/routes');
var RStop = require('./Models/RStops');
var Stop = require('./Models/stops');
var Time = require('./Models/times');
var TTT;
const port = 3000;


let code;
 app.use(express.static(__dirname + '/models'));
  app.use(express.static(__dirname + '/Routes'));
   app.use(express.static(__dirname + '/Controllers'));
    app.use(express.static(__dirname + '/Views'));

app.use("/bus", busRouter);


app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res){
	console.log('123');
    res.render("main.hbs")
});



app.get("/stops/:id", function(req, res){
  console.log('456');
  var id = req.params.id;  

RStop.findAll({where:{Stopname: id}}).then(data=>{
   if(data){
    console.log(data);
  res.render("search.hbs", {
    KKK:data    
  });}
}).catch();
});


app.use(cookieParser());
app.use(bodyParser());
app.get('/protected_resource', async function(req, res) {
    const token = req.cookies[authCookie1];
    const userToken = helpers.verifyToken(token);
    if(userToken){
        const user = await db.user.findByPk(userToken.id);
         res.render("edit.hbs");
       
    }
    else{
        res.redirect('/login?source=/protected-resource&callback=/token');
    }
});
app.get('/protected_resource/deletebus', async function(req, res) {
    const token = req.cookies[authCookie1];
    const userToken = helpers.verifyToken(token);
    if(userToken){
        const user = await db.user.findByPk(userToken.id);
         Route.findAll({where:{typeoftr: "bus"}}).then(data=>{
      res.render("../Views/deletebus.hbs", {
        RRR: data
      });
    })
        
    }
    else{
        res.redirect('/login?source=/protected-resource&callback=/token');
    }
});


app.get('/protected_resource/deletetrol', async function(req, res) {
    const token = req.cookies[authCookie1];
    const userToken = helpers.verifyToken(token);
    if(userToken){
        const user = await db.user.findByPk(userToken.id);
         Route.findAll({where:{typeoftr: "trol"}}).then(data=>{
      res.render("../Views/deletebus.hbs", {
        RRR: data
      });
    })
      
    }
    else{
        res.redirect('/login?source=/protected-resource&callback=/token');
    }
});

app.get('/protected_resource/deletetram', async function(req, res) {
    const token = req.cookies[authCookie1];
    const userToken = helpers.verifyToken(token);
    if(userToken){
        const user = await db.user.findByPk(userToken.id);
         Route.findAll({where:{typeoftr: "tram"}}).then(data=>{
      res.render("../Views/deletebus.hbs", {
        RRR: data
      });
    })
        
    }
    else{
        res.redirect('/login?source=/protected-resource&callback=/token');
    }
});

app.get("/protected_resourse/buses/:id", function(req, res){
    const token = req.cookies[authCookie1];
    const userToken = helpers.verifyToken(token);
    if(userToken){
  console.log('456');
  var ID = req.params.id;    
Route.destroy({
  where: {
    Routeid: ID
  }
}).then((data) => {
  if(data){
    console.log('deleted');
    res.render('done.hbs');}
    else res.render('error.hbs');
});} else{
        res.redirect('/login?source=/protected-resource&callback=/token');
    }
});
app.post("/protected_resource/deletestop", function(req, res){
    const token = req.cookies[authCookie1];
    const userToken = helpers.verifyToken(token);
    if(userToken){
  console.log(req.body.name);
  var ID = req.body.name;    
RStop.destroy({
  where: {
    Stopname: ID
  }
}).then((data) => {

if(data){
console.log('deleted');
res.render('done.hbs');}
else res.render('error.hbs');


});
} 
else{
        res.redirect('/login?source=/protected-resource&callback=/token');
    }
});

app.post('/search', async (req, res) => {
  if(req.body.name)
    RStop.findAll({where:{Stopname: req.body.name}}).then(data=>{
  res.render("search.hbs", {
    KKK:data    
  });
}).catch();

});


app.get('/token', (req, res) => {
    res.cookie(authCookie1, req.query.token);

    res.redirect(req.query.source);
});

app.get('/login', (req, res) => {
    const token = req.cookies[authCookie];

    if(helpers.verifyToken(token)){
        res.redirect(req.query.callback + `?source/protected-resource&token=${token}`);
    }
    else{
        res.sendFile(__dirname + '/login.html');
    }
});

app.post('/login', async (req, res) => {
    const user = await db.user.findOne({
        where: {
            email: req.body.email
        },
        raw: true
    });
    const login = req.body.email;
  const passwordd = req.body.pass;
  

  if (!login || !passwordd) {
    res.json({
      ok: false,
      error: 'Все поля должны быть заполнены!',
      fields: ['login', 'password']
    });
  } else if (login.length < 3 || login.length > 25) {
    res.json({
      ok: false,
      error: 'Длина логина от 3 до 25 символов!',
      fields: ['login']
    });
  }  else {
    console.log(req.body);
console.log(bcrypt.hashSync(req.body.pass, 5));
    if(!user || !bcrypt.compareSync(req.body.pass, user.password)){
        res.json({code: 400, message: 'Invalid data'});
    }
    else{
        codes = JSON.parse(user.codes);
        const num = Math.floor(Math.random() * 4);

        code = codes[num];

        const token = jwt.sign({
                'id': user.id
            },
            'secret',
            {
                expiresIn: 2*60
            });

        res.redirect(`/codes?source=/protected_resource&callback=/token&token=${token}&code=${num}`);
        }}
});

app.get('/codes', (req, res) => {
    res.cookie("temptoken", req.query.token);

    res.sendFile(__dirname + '/codes.html');
});

app.post('/codes', async (req, res) => {
    const token = req.cookies['temptoken'];
    const data = helpers.verifyToken(token);
    console.log(code);
    console.log(req.body.code);
    if(req.body.code == code && data){
        const user = await db.user.findByPk(data.id);

        const newToken = jwt.sign({'id': user.id},
                                    'secret',
                                    {expiresIn: 30*60});
        res.redirect(`/token?source=/protected_resource&token=${newToken}`);
    }
    else{
        res.json({code: 400, message: 'invalid code'});
    }
});

app.listen(port, async () => {
    console.log('sso is running on port ' + port);
});

module.exports.app = app;




