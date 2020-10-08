const { execSync } = require('child_process');

const Database = {}

Database._exec = (query) => {
    let command = 'echo "' + query + '" | psql';

    if (Database.databaseName) {
        command += ' -d ' + Database.databaseName;
    }

    return execSync(command).toString().trim();
}

Database.databaseName = '';

Database.initialize = (databaseName) => {
    Database.databaseName = databaseName;
}

Database.execute = (query) => {
    return Database._exec(query);
}

module.exports = Database;
