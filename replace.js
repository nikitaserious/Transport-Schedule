var fs = require('fs');
//var replace = require("replace");
fs.readFile('routes.csv',  function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  var result = data.toString().replace(/^\uFEFF/, '');
   

  fs.writeFile('1.csv', result, function (err) {
     if (err) return console.log(err);
  });
});



fs.readFile('stops1.csv',  function (err,data) {
  if (err) {
    return console.log(err);
  }
  
  var result1 = data.toString().replace(/^\uFEFF/, '');
   

  fs.writeFile('2.csv', result1, function (err) {
     if (err) return console.log(err);
  });
});
