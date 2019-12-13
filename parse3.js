const csv = require('csv-parser')
const fs = require('fs')
const axios = require('axios')
const results = [];
const Papa = require('papaparse')
//var Time = require('./Models/time');
var str='';
var str1='';
var str2='';
var str3='';
var Time = require('./Models/times');



///////разбить по пробелу
//var hours=parseInt((365/60)%60);
//var minutes=365-(60*hours);


axios.get('http://www.minsktrans.by/city/minsk/times.txt')
  .then(function (response) {
    // handle success
    //console.log(response);
    str=response.data.toString();
    //str1=str1.substr(0,81125);
    str1=str.substr(169005);
    //console.log(str2);

    arr = str1.split('\n');
    //var arrsec = str2.split('\n');
    //console.log(arrsec);
    for (var  j= 0; j<arr.length - 1; j++) {
    	arr1=arr[j].toString().split(',');
    	kekes=arr1[0];
    	//console.log( typeof kekes);
    	summinutes=0;
    	for(var  k= 0; k<arr1.length - 1; k++)
    	{
    		if (arr1[k]<0) break;
    		//kekes=arr1[k];
    		if (arr1[k]>0 & arr1[k]<1000)
    		{
    			  //console.log(arr1[k]);
    			  
    			  //console.log(arr1[k]);
    			  summinutes=summinutes+parseInt(arr1[k]);    			  
    			  hours=parseInt((summinutes/60)%60);
    			  minutes=summinutes-(60*hours);
    			  hours = (hours = 24) ? "00"  : hours;
                  hours = (hours = 25) ? "01"  : hours;
                  hours = (hours = 26) ? "02"  : hours;
                  hours = (hours < 10) ? "0" + hours : hours;
  				  minutes = (minutes < 10) ? "0" + minutes : minutes;
  				  time=hours + ":" + minutes;
  				  //console.log(typeof kekes);
  				  Time.create({
    	RouteID: kekes,
    	Time: time  
  	}).then(res=>{
   	 //console.log(res);
 	 }).catch(err=>console.log(err));

    		}
    		
    	}
    	//console.log(kekes);
    	//console.log(arr1[0]);
    	
    	}
    	


    	/*for (var  j1= 0; j<arrsec.length - 1; j1++) {
    	arr2=arrsec[j1].toString().split(',');
    	kekes=arr2[0];
    	//console.log( typeof kekes);
    	summinutes=0;
    	for(var  k1= 0; k1<arr2.length - 1; k1++)
    	{
    		if (arr2[k1]<0) break;
    		//kekes=arr1[k];
    		if (arr2[k1]>0 & arr2[k1]<1000)
    		{
    			  //console.log(arr1[k]);
    			  
    			  //console.log(arr1[k]);
    			  summinutes=summinutes+parseInt(arrsec[k1]);    			  
    			  hours=parseInt((summinutes/60)%60);
    			  minutes=summinutes-(60*hours);
    			  hours = (hours < 10) ? "0" + hours : hours;
  				  minutes = (minutes < 10) ? "0" + minutes : minutes;
  				  time=hours + ":" + minutes;
  				  //console.log(typeof kekes);
  				  Time.create({
    	RouteID: kekes,
    	Time: time  
  	}).then(res=>{
   	 //console.log(res);
 	 }).catch(err=>console.log(err));

    		}
    		
    	}    	
    	
    	}*/
    	//console.log(arr1[1]);
    	//console.log(kekes);
    
    	
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  