const http = require('http');

const makeGet = (url, onSuccess = () => {}, onError = () => {}) => {
    http.get(url, onSuccess)
        .on("error", onError);
};

module.exports = makeGet;