/* global module,require */
'use strict';

var _ = require('underscore');
var fs = require('fs');
var Parse = require('parse').Parse;

var Migration = require('./migration').Migration;

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
            return Parse.Promise.as(migrationNames.sort());
        }
    );
}

function Migrator() {

}

Migrator.prototype.up = function() {
    var availableMigrationNames = getMigrationNamesFromDirectory(MigrationDir);
    getMigrationNamesFromParse().then(
        function(completedMigrationNames) {
            var upMigrationNames = _.difference(availableMigrationNames,
                                                completedMigrationNames);
            _.each(upMigrationNames, function(migrationName) {
                var migration = Migration.withName(migrationName);
                migration.up(Parse);
            });
        });
};

Migrator.setMigrationDir = function(dir) {
    MigrationDir = dir;
};

module.exports = Migrator;
