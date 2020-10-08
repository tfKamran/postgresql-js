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

    after(function() {
        Database.initialize('');
        Database.execute('DROP DATABASE test_database');
    });
});    
