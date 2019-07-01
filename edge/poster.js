const sender = require("./sender.js");
var fs = require('fs');

// Send a post request every x seconds
function poster(){

    var array = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        
        var i = 1;                   
            function looper () {           
            setTimeout(function () { 
                sender.sendOne(array[i])         
                i++;                   
                if (i < array.length) {            
                    looper();             
                }                       
            }, 100)
            }
            looper(); 

}

poster();