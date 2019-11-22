const HTMLParser = require('js-html-parser');
const jsonToCSV = require('json-to-csv');
const selectors = require('./consts/selectors');
const { tableHeaders, fileName } = require('./consts/other');

const parseHTML = async(data) => {
    const root = HTMLParser.parse(data);

    const tableValues = root.querySelector(selectors.tableSelector).childNodes.filter((elem, index) => index % 2 !== 0).reduce((array, tr) => {
        const trValues = tr.childNodes.filter((elem, index) => index % 2 !== 0).reduce((acc, td, index) => {
            acc[tableHeaders[index]] = td.text;
            return acc;
        }, {});
        array.push(trValues);
        return array;
    }, []);

    try {
        await jsonToCSV(tableValues, fileName);
        console.log(`Данные успешно выгружены в файл ${fileName}`);
    }
    catch(error) {
        console.log('У нас печалька - данные не выгрузились :(');
        console.log(`Ошибка: ${error}`);

    }

    const distancesInfo = root.querySelector(selectors.programNotesSelector).toString()
        .split(selectors.distanceSelector).pop().split('<br />')[0];
    let distancesResult = {};
    distancesInfo.split('; ').forEach(kind => {
        let key = kind.split(' ')[0];
        distancesResult[key] = kind.split(' ')[1];
    });

    const waterInfo = root.querySelector(selectors.programNotesSelector).toString()
        .split(selectors.waterTemperatureSelector).pop().split('<br />')[0];
    const waterResult = {
        'Water Temperature' : waterInfo.split('º')[0],
    };

    const airResult = {
        'Air Temperature' : waterInfo.split('Air temperature ')[1].split('º')[0],
    };

    const penaltyResult = {
        'isPenalty' : (root.querySelector(selectors.programNotesSelector).toString().includes('penalty')),
    };

    console.log(distancesResult);
    console.log(waterResult);
    console.log(airResult);
    console.log(penaltyResult);
};

module.exports = parseHTML;