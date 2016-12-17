'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const logger     = require('morgan');

module.exports = () => {
  const app = express();

  app.set('view engine', 'ejs');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(logger('dev'));

  return app;
};