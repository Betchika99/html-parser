const HTMLParser = require('js-html-parser');
const jsonToCSV = require('json-to-csv');
const selectors = require('./consts/selectors');
const { tableHeaders, fileName } = require('./consts/other');

const parseHTML = async(data) => {
    const root = HTMLParser.parse(data);

    let title = '', count = '';
    const tableValues = root.querySelector(selectors.tableSelector).childNodes
        .slice(3)
        .filter((elem, index) => index % 2 === 0)
        .reduce((array, tr) => {
            const trValues = tr.childNodes.filter((elem, index) => index % 2 !== 0).reduce((acc, td, index) => {
                let value = td.text.trim().replace(/\n/gi, '');
                // to duplicate data from previous row if cell is empty
                if (value === '') {
                    if (index === 0) value = title;
                    if (index === 1) value = count;
                } else {
                    if (index === 0) title = value;
                    if (index === 1) count = value;
                }

                acc[tableHeaders[index]] = value;
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
};

module.exports = parseHTML;