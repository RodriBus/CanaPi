/*global $, componentHandler, getMaterialColor*/
'use strict';
var altBool = false;
/**
 * Card handler for dynamic display and dat aupdate
 * @param {string} mac mac address
 * @param {string} ip  ip address
 */
function Card(mac, ip) {
  this.id = Card.currentId++;
  this.mac = mac;
  this.ip = ip;
  this.name = mac;
  this.isTrusted = altBool = !altBool;
  Card.cards[mac] = this;
}

Card.currentId = 0;
Card.cards = {};

/**
 * Creates a new card and appends it to the main grid
 */
Card.prototype.create = function Card$create() {
  var elCard = this._createCardElement();

  $('.mdl-grid').append(elCard);

  componentHandler.upgradeAllRegistered();
};

/**
 * Updates dom element of an existing card
 */
Card.prototype.update = function Card$update() {
  $('#card-' + this.id).replaceWith(this._createCardElement());
  componentHandler.upgradeAllRegistered();
};

/**
 * Edits card info and updates the dom element
 * @param {string} name name
 * @param {string} ip   ip address
 * @param {string} mac  mac address
 */
Card.prototype.setInfo = function(name, ip, mac) {
  this.name = name;
  if (ip) {
    this.ip = ip;
  }
  if (mac) {
    this.mac = mac;
  }
  this.update();
};

/**
 * Generates a card dom element
 */
Card.prototype._createCardElement = function Card$_createCardElement() {
  var self = this;
  var elCard = $('<div/>');
  elCard.addClass('mdl-card mdl-card-device mdl-cell mdl-shadow--2dp');
  elCard.addClass('mdl-cell--3-col');
  elCard.addClass('mdl-cell--4-col-tablet');
  elCard.addClass('mdl-cell--6-col-phone');
  elCard.attr('id', 'card-' + this.id);

  var elTitle = $('<div/>');
  elTitle.addClass('mdl-card__title mdl-card--expand');
  elTitle.css({
    'background-image': 'url("https://robohash.org/' + this.mac + '")',
    'background-color': getMaterialColor('#' + _macToHexColor(this.mac))
  });

  var elTitleText = $('<h1/>');
  elTitleText.addClass('mdl-card__title-text');
  elTitleText.text(this.name);
  elTitle.append(elTitleText);

  elCard.append(elTitle);

  var elSupportingText = $('<div/>');
  elSupportingText.addClass('mdl-card__supporting-text flex');


  var elSupportingTextInfoIcon = $('<i/>');
  elSupportingTextInfoIcon.addClass('material-icons mdl-card__supporting-text--minilogo vertical-align-middle');
  elSupportingTextInfoIcon.text('info');
  elSupportingText.append(elSupportingTextInfoIcon);

  var elSupportingTextInfoArea = $('<div/>');
  elSupportingTextInfoArea.append('<span><strong>MAC address:</strong> ' + this.mac + '</span>');
  elSupportingTextInfoArea.append('<span><strong>IP address:</strong> ' + this.ip + '</span>');
  elSupportingText.append(elSupportingTextInfoArea);

  elCard.append(elSupportingText);

  var elActions = $('<div/>');
  elActions.addClass('mdl-card__actions mdl-card--border');

  var elEditButton = $('<a/>');
  elEditButton.addClass('mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect');
  elEditButton.text('Edit');
  elActions.append(elEditButton);

  elActions.append($('<div class="mdl-layout-spacer"/>'));

  if (this.isTrusted) {
    var elLoveButton = $('<div/>');
    elLoveButton.addClass('mdl-button mdl-button--icon mdl-button--accent');
    elLoveButton.attr('id', 'btn-love' + this.id);
    elLoveButton.append($('<i class="material-icons">favorite</i>'));
    elLoveButton.click(function() {
      self._changeTrusted();
    });
    elActions.append(elLoveButton);

    var elLoveButtonTooltip = $('<div/>');
    elLoveButtonTooltip.addClass('mdl-tooltip mdl-tooltip--top');
    elLoveButtonTooltip.attr('for', 'btn-love' + this.id);
    elLoveButtonTooltip.text('Trust');
    elActions.append(elLoveButtonTooltip);
  } else {
    var elDangerButton = $('<div/>');
    elDangerButton.addClass('mdl-button mdl-button--icon mdl-button--colored mdl-color-text--red-500');
    elDangerButton.attr('id', 'btn-danger' + this.id);
    elDangerButton.append($('<i class="material-icons">warning</i>'));
    elDangerButton.click(function() {
      self._changeTrusted();
    });
    elActions.append(elDangerButton);

    var elDangerButtonTooltip = $('<div/>');
    elDangerButtonTooltip.addClass('mdl-tooltip mdl-tooltip--top');
    elDangerButtonTooltip.attr('for', 'btn-danger' + this.id);
    elDangerButtonTooltip.text('Untrust');
    elActions.append(elDangerButtonTooltip);
  }


  elCard.append(elActions);

  return elCard;
};

/**
 * Set or switch trusted property and updates dom model
 * @param  {boolean} trusted? is trusted
 */
Card.prototype._changeTrusted = function(trusted) {
  if (typeof trusted === 'undefined') {
    this.isTrusted = !this.isTrusted;
  } else {
    this.isTrusted = trusted;
  }
  this.update();
};

/**
 * Generates an hex color based on mac address string
 * @param  {string} mac mac address
 * @return {string}     hex color string
 */
function _macToHexColor(mac) {
  mac = mac.split(':').join('');
  var stringHexNumber = (
    parseInt(
      parseInt(mac, 36)
      .toExponential()
      .slice(2, -5), 10) & 0xFFFFFF
  ).toString(16).toUpperCase();
  return stringHexNumber;
}
