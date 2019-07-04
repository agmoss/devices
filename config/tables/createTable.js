var AWS = require("aws-sdk");
var config = require('../config/config');
var dynamodb = new AWS.DynamoDB();

/**
 * Create an AWS dynamo db table
 */

AWS.config.update(config.aws_remote_config);

var params = {
    TableName : config.aws_table_name,
    KeySchema: [       
        { AttributeName: "key", KeyType: "HASH"} //Partition key
    ],
    AttributeDefinitions: [   
        { AttributeName: "key" ,AttributeType:"S"}   
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});