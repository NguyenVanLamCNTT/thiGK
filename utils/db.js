const AWS = require('aws-sdk');

AWS.config.update({
    region: 'ap-northeast-1',
    accessKeyId: 'AKIAQJ4NT6K2FJDQHED7',
    secretAccessKey: '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'
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;