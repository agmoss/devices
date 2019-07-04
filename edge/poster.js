const sender = require("./sender.js");
var fs = require('fs');

/**
 * Send a post request every 100 ms
 * 
 * This function reads in a json file and sends each entry as a post request to the endpoint 
 * specified in sender.sendOne
 * 
 * This function is used in conjunction with sender.js  to simulate a single IoT device
 */
function poster(){

    var array = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        
        var i = 1;                   
            function looper () {           
            setTimeout(function () {
                // Must require the sendOne function
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