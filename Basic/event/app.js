const EventEmitter = require('events');
const emitter = new EventEmitter();

const Logger = require('./logger');
const logger = new Logger();

// Register a listener
logger.on('messageLogged', (arg) => {
    console.log('event listened');
    console.log('Listener called:', arg);
});

console.log('first');
logger.log('message');
