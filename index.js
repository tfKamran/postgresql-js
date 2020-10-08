const { execSync } = require('child_process');

const Database = {}

Database._exec = (query) => {
    let command = 'echo "' + query + '" | psql';

    if (Database.databaseName) {
        command += ' -d ' + Database.databaseName;
    }

    return execSync(command).toString().trim();
}

Database._toCSV = (array, quote) => {
    if (array.length == 0) {
        return '';
    } else if (array.length == 1) {
        return quote + array[0] + quote;
    } else {
        return array.reduce((acc, current, index, source) => {
                if (index == 1) {
                    acc = quote + acc + quote;
                }

                if (index < source.length) {
                    acc += ', ';
                }

                return acc + quote + current + quote;
            })
    }
}

Database.databaseName = '';

Database.initialize = (databaseName) => {
    Database.databaseName = databaseName;
}

Database.execute = (query) => {
    return Database._exec(query);
}

Database.query = (query) => {
    const response = Database._exec(query).split('\n');
    const keys = response[0].split('|').map(column => column.trim());
    const result = [];

    if (response[response.length - 1] != '(0 rows)') {
        for (let rowIndex = 2; rowIndex < response.length - 1; rowIndex++) {
            const row = response[rowIndex].split('|').map(item => item.trim());

            const resultItem = {};
            keys.forEach((key, index) => {
                resultItem[key] = row[index];
            })
            result.push(resultItem);
        }
    }

    return result;
}

Database.insert = (table, item) => {
    const query = 'INSERT INTO ' + table
        + ' ('
        + Database._toCSV(Object.keys(item), '"')
        + ') VALUES ('
        + Database._toCSV(Object.values(item), '\'')
        + ')';

    return Database._exec(query).split(' ')[2];
}

module.exports = Database;
