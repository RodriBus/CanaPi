'use strict';

var info = require('debug')('NETWATCHER:info');
var log = require('debug')('NETWATCHER:log');
var error = require('debug')('NETWATCHER:error');
var debug = require('debug')('NETWATCHER:debug');

var Scanner = require('./scanner');
var config = require('../config.json');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database
});


/**
 * Updates the database when a scan is performed
 * @param  {object[]} data data found on the scan
 * @param  {string} data[].ip ip of the found device
 * @param  {string} data[].mac mac of the found device
 * @param  {string} data[].vendor vendor of the found device
 * @param  {string} data[].timestamp timestam for when the device was found
 */
function updateRegister(data) {
  for (var index = 0; index < data.length; index++) {
    var ip = data[index].ip;
    var mac = data[index].mac;
    var vendor = data[index].vendor;
    insertIntoDevices(mac, ip, vendor, insertIntoDetections);
  }
}


/**
 * Callback for 'insertIntoDevices' function
 *
 * @callback onInsertTableSuccess
 * @param  {string} mac
 * @param  {timestamp} now
 */

/**
 * [insertIntoDevices description]
 * @param  {string}   mac    [description]
 * @param  {string}   ip     [description]
 * @param  {string}   vendor [description]
 * @param  {onInsertTableSuccess} cb     [description]
 */
function insertIntoDevices(mac, ip, vendor, cb) {
  var now = Date.now();
  debug('Updating "devices" with', ip, mac, vendor, now);
  connection.query({
    sql: 'INSERT INTO devices (mac, ip, vendor, is_trustable) VALUES(?, ?, ?, false) ON DUPLICATE KEY UPDATE ip=?',
    values: [mac, ip, vendor, ip]
  }, function(error, results, fields) {
    if (error) {
      error('error trying to insert or update table "devices"', error);
      process.exit(1);
      return;
    }
    info('table "devices" successfully updated');
    cb(mac, now);
  });
}


/**
 * [insertIntoDetections description]
 * @param  {string} mac [description]
 * @param  {timestamp} now [description]
 */
function insertIntoDetections(mac, now) {
  debug('Updating "detections" with', mac, now);
  connection.query({
    sql: 'INSERT INTO detections (mac, timestamp) VALUES(?, ?)',
    values: [mac, now]
  }, function(error, results, fields) {
    if (error) {
      error('error trying to insert or update table "detections"', error);
      process.exit(1);
      return;
    }
    info('table "detections" successfully updated');
  });
}


/**
 * [start description]
 * @return {[type]} [description]
 */
function start() {
  log('trying to connect to db...');
  connection.connect(function(err) {
    if (err) {
      error('error connecting: ' + err.stack);
      return;
    }
    info('successfully connected to db as id ' + connection.threadId);
  });
  var scanner = new Scanner();
  scanner.on('data', updateRegister);
  scanner.init(true);
}


module.exports = {
  start: start

}
