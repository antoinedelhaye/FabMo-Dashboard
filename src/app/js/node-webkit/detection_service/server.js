/**
 * @author jimmy
 */
var os = require('os');
var restify = require('restify');
if (os.platform() === 'darwin'){ //if MAC OSX	
	var package_json = require('../package.json');
}
else{
	var package_json = require('./package.json');
}

var server = restify.createServer({name:"local_api"});
// allow JSON over Cross-origin resource sharing 
server.use( function crossOrigin(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	return next();
});
if (os.platform() === 'darwin'){ //if MAC OSX
	var routes = require('./detection service/routes')(server);
	
}
else{
	var routes = require('./app/detection service/routes')(server);
	
}
server.on('error',function (err) {
    if (err.code == 'EADDRINUSE')
    	console.log('Problem during server initialisation : '+ err);
    return;
});

server.listen(package_json.detection_service_port || 8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});

//module.exports = this;
