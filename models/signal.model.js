const config = require('../config/config');
const dynamoose = require('dynamoose');
const Schema = dynamoose.Schema;

dynamoose.AWS.config.update(config.aws_remote_config);

const assetsSchema = new Schema({
    key: String,
    AssetUN: String,
    entry_date: String,
    status:String
});

// Compile model from schema
module.exports =  dynamoose.model('sigall', assetsSchema);

