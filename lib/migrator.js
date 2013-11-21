/* global module,require */
'use strict';

var _ = require('underscore');
var fs = require('fs');
var Parse = require('parse').Parse;

var MigrationRecord = require('./migrationrecord').MigrationRecord;

var MigrationDir = '';

function getMigrationNamesFromDirectory(dir) {
    var migrationNames = fs.readdirSync(dir).sort();
    migrationNames = _.map(migrationNames, function(migration) {
        return migration.replace(/.js$/, '');
    });
    return migrationNames;
}

function getMigrationNamesFromParse() {
    var migrationNames = [];
    var q = new Parse.Query(MigrationRecord);
    return q.each(function(migrationRecord) {
        migrationNames.push(migrationRecord.getName());
    }).then(
        function() {
            return Parse.Promise.as(migrationNames);
        }
    );
}

function Migrator() {

}

Migrator.prototype.up = function() {
    var migrations = getMigrationNamesFromDirectory(MigrationDir);
    getMigrationNamesFromParse().then(
        function(migrationNames) {
            console.log(JSON.stringify(migrationNames));
            console.log('locals: ' + JSON.stringify(migrations));
        }
    );
};

Migrator.setMigrationDir = function(dir) {
    MigrationDir = dir;
};

module.exports = Migrator;
