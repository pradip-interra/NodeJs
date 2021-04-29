const EventEmitter = require('events');

var url = 'www.foo.com';

class Logger extends EventEmitter {
	log(message) {
		console.log('second');
		console.log(message);

		// raise an event
		console.log('event emitted');
		this.emit('messageLogged', {id: 1, url:'http://foo.bar'});
	}
}

module.exports = Logger;
