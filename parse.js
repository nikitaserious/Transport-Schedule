const csv = require('csv-parser')
const fs = require('fs')
const axios = require('axios')
const Papa = require('papaparse')
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var xhr = new XMLHttpRequest();
const results = [];
//const arr = [];
const results1 = [];
var Route = require('./Models/routes');
var RStop = require('./Models/RStops');
var str1='A>B';
var str2='B>A';
var typetr;
 
/*fs.createReadStream('routes.csv')
  .pipe(csv({separator: ";"}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    //console.log(results[0].City);
    for (var i=0;i< 50;i++ )
    {
    	console.log(results[i].RouteStops);
    }

    
  });
  */
  /*axios.get('http://www.minsktrans.by/city/minsk/routes.txt')
	.then((response) => {
        console.log("\t\t\ttask 01.1\t\t\t");
        fs.writeFile('routes1.csv', response, (err) => {
  		if (err) throw err;
  		console.log('It\'s saved!');
});
		//console.log(response);
		fs.createReadStream('routes.csv')
  .pipe(csv({separator: ";"}))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    //console.log(results[0].City);
    for (var i=0;i< 50;i++ )
    {
    	console.log(results[i].RouteStops);
    }
        

       

	}).catch((err) => {
	console.log(`Error task 01.1: ${err}`);
	});*/


	 /*axios.get('http://www.minsktrans.by/city/minsk/routes.txt')
	.then((response) => {
        console.log("\t\t\ttask 01.1\t\t\t");
        fs.writeFile('routes1.csv', response, (err) => {
  		if (err) throw err;
  		console.log('It\'s saved!');
});*/


        axios.get('http://www.minsktrans.by/city/minsk/routes.txt')
	.then((response) => {
		console.log("\t\t\ttask 01.1\t\t\t");
        fs.writeFile('routes.csv', response.data, (err) => {
  		if (err) throw err;
  		console.log('It\'s saved!');

  		const file = fs.createReadStream('1.csv');
  		var results1=Papa.parse(file, {
  			//download: true,  
  			delimiter: ";",	
  			//fields: ['RouteNum','Authority','City','Transport','Operator','ValidityPeriods','SpecialDates','RouteTag','RouteType','Commercial','RouteName','Weekdays','RouteID','Entry','RouteStops','Pikas2012.11.19','Datestart'],
  			header: true,	 			
  			//step: function(results, parser) {
	//console.log("Row data:", results.data);
	//console.log("Row errors:", results.meta);
//}
	complete: function(results) {
		
		for (var i=0;i<results.data.length;i++ )
    {
    	//console.log(results.data[i]);
    	//console.log(typeof results.data[i].RouteType);
    	////////////////////////
    	arr = results.data[i].RouteStops.split(',');
    	//console.log(arr);
    	//arr = results.data[i].RouteStops.split(',');
    	//console.log(arr);
    	
    	
  ////////////////////
    	if(results.data[i].RouteType==str1)
    	{
    		//console.log('kek------------'+results.data[i].RouteType);
        if (results.data[i].Transport) {typetr=results.data[i].Transport}
    	Route.create({
    Routeid: results.data[i].RouteID,
    Routenum: results.data[i].RouteNum,
    Weekdays:results.data[i].Weekdays,
    Routename:results.data[i].RouteName,
    Routetype:results.data[i].RouteType,
    Typeoftr:typetr
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));

  for (var  j= arr.length - 1; j >= 0; j--) {
   		RStop.create({
    Stopid: arr[j],
    RSid: results.data[i].RouteNum,
    Typeoftr:typetr,
    Routetype:results.data[i].RouteType,
    Routeid:results.data[i].RouteID     
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));
    	}
    	/////////
    }
	if(results.data[i].RouteType==str2)
    	{
    		//console.log('kek------------'+results.data[i].RouteType);
        if (results.data[i].Transport) {typetr=results.data[i].Transport}
    	Route.create({
    Routeid: results.data[i].RouteID,
    Routenum: results.data[i-1].RouteNum,
    Weekdays:results.data[i].Weekdays,
    Routename:results.data[i].RouteName,
    Routetype:results.data[i].RouteType,
    Typeoftr:typetr
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));
    
for (var  k= arr.length - 1; k >= 0; k--) {
   		RStop.create({
    Stopid: arr[k],
    RSid: results.data[i-1].RouteNum,
    Typeoftr:typetr,
    Routetype:results.data[i].RouteType,
    Routeid:results.data[i].RouteID    
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));
    	}
    	}
	}
		//console.log("Finished:", results.data[0].RouteNum);
	}
	
});
  		//var len = results1.data[0].length;
  		//console.log(results1.data);
  		

  	//	fs.createReadStream('data.csv')
  //.pipe(csv({separator: ";"}))
  //.on('data', (data) => results.push(data))
  //.on('end', () => {
    //console.log(results);
    /*for (var i=0;i< 50;i++ )
    {
    	if( typeof(results[i].RouteStops)=='undefined')
    		{results.splice(i,1);
    			console.log('deleted');}
    
    }*/
    


    
  //});
  		//console.log(response);
});
        

	}).catch((err) => {
	console.log(`Error task 01.1: ${err}`);
	});