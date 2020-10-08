# postgresql-js

[![npm version](https://badge.fury.io/js/postgresql-js.svg)](https://badge.fury.io/js/postgresql-js)
[![npm downloads](https://img.shields.io/npm/dt/postgresql-js.svg)](https://www.npmjs.com/package/postgresql-js)

[![NPM](https://nodei.co/npm/postgresql-js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/postgresql-js/)

A simple library that lets you control and query local PostgreSQL server.

**Note:** It is built over `psql` CLI interface, so it won't work unless `psql` is executable through terminal.

## How to install?

You need to have Node.js installed on your system before you can use this package. Get it here: [Node.js](https://nodejs.org/)

Once you have Node.js and NPM setup, the installation is as simple as running a command.

### Linux/Mac

    npm install -s postgresql-js

### Windows

Within a command prompt window with administrative privileges:

    npm install -s postgresql-js

## How to use?

You can initialize the library to use a particular database by passing the name:

    const Database = require('postgresql-js');
    Database.initialize('my_database');

------

To execute non SELECT queries like INSERT, UPDATE, DELETE, DROP or PostgreSQL commands like /c, you can use the function `execute`:

    Database.execute('CREATE TABLE my_table (id SERIAL, text VARCHAR (100)');
    Database.execute('INSERT INTO my_table ("text") VALUES (\'the value\')');

------

For SELECT queries, you can call the function `query` to fetch the results as JSON:

    Database.query('SELECT * FROM my_table');

The query function returns something like:

    [{ id: '1', text: 'the value' }]

## How to contribute?

Feel free to raise a pull request!
