const dynamoose = require('dynamoose');

const Schema = dynamoose.Schema;

const assetsSchema = new Schema({
    key: String,
    AssetUN: String,
    entry_date: String,
    status:String
});

// Compile model from schema
module.exports =  dynamoose.model('assets', assetsSchema);
