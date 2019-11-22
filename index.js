const parseHTML = require('./parser');
const paths = require('./consts/paths');
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

makeGet(`${home}${paths[3]}`, callback, onError);
