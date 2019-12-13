const csv = require('csv-parser')
const fs = require('fs')
const axios = require('axios')
const results = [];
const Papa = require('papaparse')

var str='';
var str1='';
var str2='';
var str3='';
var Time = require('./Models/times');






axios.get('http://www.minsktrans.by/city/minsk/times.txt')
  .then(function (response) {   
    str=response.data.toString();    
    str1=str.substr(81126,169004);

    arr = str1.split('\n');   
    for (var  j= 0; j<arr.length - 1; j++) {
    	arr1=arr[j].toString().split(',');
    	kekes=arr1[0];    	
    	summinutes=0;
    	for(var  k= 0; k<arr1.length - 1; k++)
    	{
    		if (arr1[k]<0) break;    		
    		if (arr1[k]>0 & arr1[k]<1000)
    		{    			  
    			  summinutes=summinutes+parseInt(arr1[k]);    			  
    			  hours=parseInt((summinutes/60)%60);
    			  minutes=summinutes-(60*hours);
    			 hours = (hours = 24) ? "00"  : hours;
                  hours = (hours = 25) ? "01"  : hours;
                  hours = (hours = 26) ? "02"  : hours;
                  hours = (hours < 10) ? "0" + hours : hours;
  				  minutes = (minutes < 10) ? "0" + minutes : minutes;
  				  time=hours + ":" + minutes;
  				  
  				  Time.create({
    	RouteID: kekes,
    	Time: time  
  	}).then(res=>{
   	
 	 }).catch(err=>console.log(err));

    		}
    		
    	}
    	
    	
    	}
    	


    	
    
    	
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  