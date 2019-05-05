var request = require('request');
var config = require('./config');

functions = {
    authorize: function(req, res) {
        var header = config.consumerKey + ':' + config.consumerSecret;
        var encodedHeader = new Buffer.from(header).toString('base64');
        var finalHeader = 'Basic ' + encodedHeader;

        request.post(
            'https://api.twitter.com/oauth2/token', 
            {
                form: {'grant_type': 'client_credentials'},
                headers: {Authorization: finalHeader} 
            }, function(error, response, body) {
                if(error) {
                    console.log(error);
                } else {
                    config.bearerToken = JSON.parse(body).access_token;
                    res.json({success: true, data: config.bearerToken});
                }
            });
    }
}

module.exports = functions;