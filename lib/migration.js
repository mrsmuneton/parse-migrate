/* global module,require,__dirname */
'use strict';

var _ = require('underscore');
var fs = require('fs');
var moment = require('moment');
var path = require('path');

var MigrationDir = '';

function makePath(dir, name, date) {
    var dateString = moment(date).format('YYYYMMDDhhmmss');
    return path.join(dir, dateString + '-' + name + '.js');
}

function migrationTemplate(name) {
    var template = fs.readFileSync(__dirname + '/migrationtemplate.js.ejs',
                                  { encoding: 'utf8' });
    return _.template(template, {
        name: name
    });
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
