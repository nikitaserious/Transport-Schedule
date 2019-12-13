const csv = require('csv-parser')
const fs = require('fs')
const axios = require('axios')
const results = [];
const Papa = require('papaparse')
var Stopp = require('./Models/stops');
var str=''; 
        axios.get('http://www.minsktrans.by/city/minsk/stops.txt')
	.then((response) => {
		console.log("\t\t\ttask 01.1\t\t\t");
        fs.writeFile('stops1.csv', response.data, (err) => {
  		if (err) throw err;
  		console.log('It\'s saved!');
  		fs.createReadStream('2.csv')
  .pipe(csv({separator: ";"}))
  .on('data', (data) => results.push(data))
  .on('end', () => {  
    for (var i=0;i<results.length;i++ )
    {    
    if (results[i].Name)
     {
    Stopp.create({
    Stopid: results[i].ID,
    Stopname: results[i].Name   
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));
  
}
else if (results[i-1].Name)
{
  
  Stopp.create({
    Stopid: results[i].ID,
    Stopname: results[i-1].Name   
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));
}
else if (results[i-2].Name)
{
  
  Stopp.create({
    Stopid: results[i].ID,
    Stopname: results[i-2].Name   
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));
}
    }

    
  });
  		
});
        

	}).catch((err) => {
	console.log(`Error task 01.1: ${err}`);
	});