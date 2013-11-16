/* global module,require */
'use strict';

var fs = require('fs');
var moment = require('moment');
var path = require('path');

var MigrationDir = '';

function makePath(dir, name, date) {
    var dateString = moment(date).format('YYYYMMDDhhmmss');
    return path.join(dir, dateString + '-' + name + '.js');
}

function migrationTemplate(name) {
    var template = [
        'exports.name = ' + name + ';',
        'exports.up = function(Parse) {',
        '',
        '};',
        ''
    ];
    return template.join('\n');
}

function Migration(name, date) {
    this.name = name;
    this.date = date;
    this.path = makePath(MigrationDir, name, date);
}

Migration.prototype.write = function() {
    fs.writeFileSync(this.path, migrationTemplate(this.name));
};

Migration.setMigrationDir = function(dir) {
    MigrationDir = dir;
};

module.exports = Migration;
