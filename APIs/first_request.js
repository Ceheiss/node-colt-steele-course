// var request = require('request');
// request('http://www.gooxzxzxgle.com', function(error, response, body){
//     if (!error && response.statusCode == 200) {
//         console.log(body) // Show the HTML for Google homepage.
//     } else {
//         console.log("Something went wrong... what? well..." + error);
//     }
// })

var request = require('request');
request('https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22chicago%2C%20il%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response, body){
    if (!error && response.statusCode == 200) {
        var parsedData = JSON.parse(body);
        console.log(parsedData.query.results.channel) // Body is a string, not a Javascript object. To make it an object, you have to parse it
        console.log("Wind speed in Chicago will be of " + parsedData.query.results.channel.wind.speed); // Good to watch the object to see where the info is
    } else {
        console.log("Something went wrong... what? well..." + error);
    }
})
