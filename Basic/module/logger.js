var url = 'http://mylogger.io/log'

function log(message){
	// comment
	console.log(message)
}

module.exports.log = log;
module.exports.endpoint = url;
