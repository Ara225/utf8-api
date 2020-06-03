var data = require('./data.json')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    if (event.queryStringParameters == null) {
        return {
            'statusCode': 404,
            'body': JSON.stringify({
                "error": "No Query string provided"
            })
        }
    }
    else if (event.queryStringParameters.searchTerm && event.queryStringParameters.name) {
        return {
            'statusCode': 500,
            'body': JSON.stringify({
                "error": "The searchTerm parameter is an alias of the name parameter. Only one can be used in a query"
            })
        }
    }
    else {
        var temp = []
        var found = null
        try {
            for (var i = 0; i<data.length; i++) {
                found = null
                if (event.queryStringParameters.name && event.queryStringParameters.name != " ") {
                    if (data[i].name.toLowerCase().indexOf(event.queryStringParameters.name.toLowerCase()) != -1) {
                        found = true
                    }
                    else {
                        found = false
                    }
                }
                if (event.queryStringParameters.char && event.queryStringParameters.char != " ") {
                    if (data[i].char.toLowerCase().indexOf(event.queryStringParameters.char.toLowerCase()) != -1) {
                        found = true
                    }
                    else {
                        found = false
                    }
                }
                if (event.queryStringParameters.searchTerm && event.queryStringParameters.searchTerm != " ") {
                    if (data[i].name.toLowerCase().indexOf(event.queryStringParameters.searchTerm.toLowerCase()) != -1) {
                        found = true
                    }
                    else {
                        found = false
                    }
                }
                if (event.queryStringParameters.code && event.queryStringParameters.code != " ") {
                    if (data[i].code.toLowerCase().indexOf(event.queryStringParameters.code.toLowerCase()) != -1) {
                        found = true
                    }
                    else {
                        found = false
                    }

                }
                if (found == true) {
                    temp.push(data[i])
                }
            }
            if (temp.length == 0) {
                return {
                    'statusCode': 404,
                    'body': JSON.stringify({
                        "error": "Unable to find matching char"
                    })
                }
            }
            // const ret = await axios(url);
            response = {
                'statusCode': 200,
                'body': JSON.stringify({
                    message: 'Found',
                    characters: temp
                })
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    
        return response
    }
};
