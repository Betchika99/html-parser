const parseHTML = require('./parser');
const makeGet = require('./net');
const { home } = require('./consts/other');

const onError = err => {
    console.log("Error: " + err.message);
};

const callback = (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        parseHTML(data);
    });
};

makeGet(home, callback, onError);
