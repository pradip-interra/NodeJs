const fs = require('fs');

// asyn call with a callback

fs.readdir('./', function(err, files) {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Result:', files);
    }
});

// fat arrow

fs.readdir('../', (err, files) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Result:', files);
    }
});
