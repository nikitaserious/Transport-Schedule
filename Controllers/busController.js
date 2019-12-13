
const bodyParser = require("body-parser");
var Route = require('../Models/routes');
var RStop = require('../Models/RStops');
var Stop = require('../Models/stops');
var Time = require('../Models/times');
var TTT;
const urlencodedParser = bodyParser.urlencoded({extended: false});

exports.getBuses = function(request, response){
    Route.findAll({where:{typeoftr: "bus"}}).then(data=>{
      response.render("../Views/index.hbs", {
        RRR: data
      });
    })
};

exports.getTrolls = function(request, response){
    Route.findAll({where:{typeoftr: "trol"}}).then(data=>{
      response.render("../Views/index.hbs", {
        RRR: data
      });
    })
};

exports.getTrams = function(request, response){
    Route.findAll({where:{typeoftr: "tram"}}).then(data=>{
      response.render("../Views/index.hbs", {
        RRR: data
      });
    })
};

exports.getID = function(req, res){
    console.log('456');
    Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
   
  var id = req.params.id;  
  Time.findAll({where:{RouteID: id}}).then(times=>{
    if(times){
  TTT=times;
  console.log('789');}
  else res.render('error.hbs');
}).catch(err=>console.log(err));
RStop.findAll({where:{Routeid: id}}).then(data=>{
  var size = Object.size(data);
  if(size>0){
    

// Get the size of an object

    console.log('sizeof'+size)
    console.log('value'+data);
  res.render("route.hbs", {
    KKK:data,
    TIM:TTT
  });}
  else res.render('error.hbs');
}).catch();
};