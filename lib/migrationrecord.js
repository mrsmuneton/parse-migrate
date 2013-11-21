/* global exports,require */
'use strict';

var Parse = require('parse').Parse;

// name -> string // 20131223123123-monkeyBalls

var MigrationRecord = Parse.Object.extend('MigrationRecord', {
    getName: function() {
        return this.get('name');
    }
}, {

});

exports.MigrationRecord = MigrationRecord;
