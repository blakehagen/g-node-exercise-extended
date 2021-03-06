'use strict';

const characterCtrl = require('./controllers/characters.controller.js');
const planetCtrl    = require('./controllers/planetResidents.controller.js');
const vehicleCtrl   = require('./controllers/vehicles.controller.js');
const filmCtrl      = require('./controllers/films.controller');


module.exports = app => {

  app.route('/character/:name')
    .get(characterCtrl.getOneCharacter);

  app.route('/characters')
    .get(characterCtrl.getCharacters);

  app.route('/planetResidents')
    .get(planetCtrl.getPlanetResidents);

  app.route('/bestVehicles')
    .get(vehicleCtrl.getBestVehicles);

  app.route('/heaviestFilms')
    .get(filmCtrl.getHeaviestFilms);

};