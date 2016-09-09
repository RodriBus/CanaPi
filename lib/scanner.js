'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var info = require('debug')('ARPSCAN:info');
var log = require('debug')('ARPSCAN:log');
var error = require('debug')('ARPSCAN:error');
var debug = require('debug')('ARPSCAN:debug');

var arpscanner = require('arpscan');


/**
 * Performs network scans based on ARP protocol
 */
var Scanner = function Scanner() {
  debug('new scanner instance');
  EventEmitter.call(this);
};
util.inherits(Scanner, EventEmitter);

/**
 * Time to wait until the next ARP seacrh
 * @type {number}
 */
Scanner.loopTime = 30000;
/**
 * Default options provided to the ARP scanner
 * @type {object}
 */
Scanner.defaultOptions = {
  args: ['-l', '-g', '-r 5']
}

/**
 * Initialize the network ARP search loop
 * @param  {boolean} [loop]   set if the scan should be periodically executed
 * @param  {object} [options] set of options for the arp-scan such as args {array}, parser {parse funcion} or sudo {boolean}
 */
Scanner.prototype.init = function Scanner$init(loop, options) {
  log('scanner initialized');
  this._scan(loop, (options || Scanner.defaultOptions));
};

/**
 * Executes the ARP scan in loop
 * @param  {object} [options] set of options for the arp-scan such as args {array}, parser {parse funcion} or sudo {boolean}
 */
Scanner.prototype._loop = function Scanner$_loop(options) {
  var self = this;
  info('waiting ' + Scanner.loopTime / 1000 + ' seconds to perform next scan');
  setTimeout(function() {
    self._scan(true, options);
  }, Scanner.loopTime);
};

/**
 * Performs a network scan
 * @param  {boolean} [loop]   set if the scan should be periodically executed
 * @param  {object} [options] set of options for the arp-scan such as args {array}, parser {parse funcion} or sudo {boolean}
 */
Scanner.prototype._scan = function Scanner$_scan(loop, options) {
  var self = this;
  info('starting ARP scan');
  arpscanner(onResult, options);

  function onResult(err, data) {
    if (err) {
      error('error found during the scanner', err);
      self.emit('error', err);
      return;
    }
    info('ARP scan ended successfully');
    self.emit('data', data);
    if (loop) {
      self._loop(options);
    }
  }
}

module.exports = Scanner;
