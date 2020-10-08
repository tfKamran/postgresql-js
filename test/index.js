const assert = require('assert');
const Database = require('../index.js');

describe('# Database', function() {
    before(function() {
        Database.execute('CREATE DATABASE test_database');
    })

    describe('## initialize', function() {
        it('should be of type function', function() {
            assert.equal('function', typeof Database.initialize);
        });

        it('should be able to initialize', function() {
            try {
                Database.initialize('test_database');
                assert.ok(true);
            } catch (error) {
                assert.fail(error);
            }
        });
    });

    describe('## execute', function() {
        it('should be of type function', function() {
            assert.equal('function', typeof Database.execute);
        });
        
        it('should return the result of execution', function() {
            assert.equal('CREATE TABLE', Database.execute('CREATE TABLE test_table (id SERIAL, string VARCHAR (100))'));
            assert.equal('INSERT 0 1', Database.execute('INSERT INTO test_table ("string") VALUES (\'some\')'));
        });
    });

    describe('## query', function() {
        it('should be of type function', function() {
            assert.equal('function', typeof Database.query);
        });

        it('should return an array', function() {
            assert.notEqual(undefined, Database.query('SELECT * FROM test_table').length);
        });

        it('should return the result of query', function() {
            assert.deepEqual([{ id: '1', string: 'some' }], Database.query('SELECT * FROM test_table'));
        });
    });

    describe('## insert', function() {
        const testItem = { string: 'other' };

        it('should be of type function', function() {
            assert.equal('function', typeof Database.insert);
        });

        it('should return number of items inserted', function() {
            assert.equal('1', Database.insert('test_table', testItem));
        });

        it('should be returned in query', function() {
            assert.deepEqual(testItem.string, Database.query('SELECT * FROM test_table WHERE string=\'' + testItem.string +'\'')[0].string);
        });
    });

    describe('## _toCSV', function() {
        it('should be of type function', function() {
            assert.equal('function', typeof Database._toCSV);
        });

        it('should return a CSV', function() {
            assert.equal('"a", "b", "c"', Database._toCSV(['a', 'b', 'c'], '"'));
            assert.equal('\'a\', \'b\', \'c\'', Database._toCSV(['a', 'b', 'c'], '\''));
            assert.equal('\'a\', \'b\', \'c\'', Database._toCSV(['a', 'b', 'c'], '\''));
        });

        it('should return with quotes for a single item', function() {
            assert.equal('\'a\'', Database._toCSV(['a'], '\''));
        });

        it('should return empty string for empty array', function() {
            assert.equal('', Database._toCSV([], '\''));
        });
    });

    describe('## _toKeyValuePairArray', function() {
        it('should be of type function', function() {
            assert.equal('function', typeof Database._toKeyValuePairArray);
        });

        it('should return a key value pair array from object', function() {
            assert.deepEqual(['"a"=\'b\''], Database._toKeyValuePairArray({ 'a': 'b' }));
            assert.deepEqual(['"a"=\'b\'', '"c"=\'d\''], Database._toKeyValuePairArray({ 'a': 'b', 'c': 'd' }));
        });

        it('should return empty string for empty object', function() {
            assert.equal('', Database._toKeyValuePairArray({}));
        });
    });

    after(function() {
        Database.initialize('');
        Database.execute('DROP DATABASE test_database');
    });
});    
