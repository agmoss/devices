var express = require('express');
var router = express.Router();

const AWS = require('aws-sdk');
const config = require('../../config/config');
const isDev = process.env.NODE_ENV !== 'production';

/* GET home page. */
router.get('/', function(req, res, next) {

    if (isDev) {
      console.log('isDev');
      AWS.config.update(config.aws_remote_config);
    } else {
      console.log('isProd');
      AWS.config.update(config.aws_remote_config);
    }
    
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: config.aws_table_name
    };

    docClient.scan(params, function(err, data) {
      if (err) {
        res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else {
        const { Items } = data;

        res.send({
          success: true,
          message: 'Loaded data',
          readings: Items
        });
      }
    });
  }); // end of app.get(/api/readings)

  
  module.exports = router;
  