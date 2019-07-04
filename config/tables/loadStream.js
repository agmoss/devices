const StreamArray = require('stream-json/streamers/StreamArray');
const path = require('path');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const jsonStream = StreamArray.withParser();
var config = require('../config/config');


/**
 * Read in a large json file and popluate a dynamo table
 */

jsonStream.on('data', ({key, value}) => {

    var params = {
        TableName: config.aws_table_name,
        Item: {
            "key":uuidv4(),
            "AssetUN":  value.AssetUN,
            "status": value.status,
            "entry_date":  value.entry_date
        }
    };
    console.log(params);
});

jsonStream.on('end', () => {
    console.log('All done');
});

// Read in a large json file
const filename = path.join(__dirname, 'data.json');
fs.createReadStream(filename).pipe(jsonStream.input);