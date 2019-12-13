const csv = require('csv-parser')
const fs = require('fs')
const axios = require('axios')
const results = [];
const Papa = require('papaparse')

var str='';
var data;
 
        axios.get('http://www.minsktrans.by/city/minsk/times.txt')
	.then((response) => {
		console.log("\t\t\ttask 01.1\t\t\t");
    //
        fs.writeFile('times1.csv', response.data, (err) => {
  		if (err) throw err;
  		console.log('It\'s saved!');
  		var stream = new fs.ReadStream('times1.csv',{encoding:"utf-8"});
      stream.on('readable', function(){

      data = stream.read();
      console.log(typeof data);
      
       arr = data.split('\n');    
    for (var  j= 0; j<arr.length - 1; j++) {
      
      console.log(arr[j]);
    }
      
    });
    
    
    

  		
});
        

	}).catch((err) => {
	console.log(`Error task 01.1: ${err}`);
	});