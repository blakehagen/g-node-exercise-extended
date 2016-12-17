'use strict';

const mainCtrl = require('./server.controller.js');

module.exports = app => {

  app.route('/api/v1/test')
    .get(mainCtrl.testRoute);

  app.route('/character/:name')
    .get(mainCtrl.getCharacter);

};