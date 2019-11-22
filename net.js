const https = require('https');

const makeGet = (url, onSuccess = () => {}, onError = () => {}) => {
    https.get(url, onSuccess)
        .on("error", onError);
};

module.exports = makeGet;