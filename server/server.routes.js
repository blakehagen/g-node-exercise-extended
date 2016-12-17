'use strict';

const characterCtrl = require('./characters.controller.js');
const planetCtrl    = require('./planetResidents.controller');

module.exports = app => {

  app.route('/character/:name')
    .get(characterCtrl.getOneCharacter);

  app.route('/characters')
    .get(characterCtrl.getCharacters);

  app.route('/planetResidents')
    .get(planetCtrl.getPlanetResidents);

};