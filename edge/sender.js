const axios = require("axios");
const uuidv4 = require('uuid/v4');

/**
 * Send a post request to /signal/add
 * 
 * This function is used in conjunction with poster.js to simulate a single IoT device
 */
function sendOne(record){

    axios.post('http://localhost:3005/signal/add', {
        key: uuidv4(),
        AssetUN: record["AssetUN"],
        status: record["status"],
        entry_date: record["entry_date"]
      })
      .then(function (response) {
        console.log(response.status + ' -- ' + response.data + ' -- ' + JSON.stringify(record));
      })
      .catch(function (error) {
        console.log(error);
      });
      
}

module.exports = {
  sendOne
}