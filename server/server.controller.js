'use strict';

const _        = require('lodash');
const BPromise = require('bluebird');
const brequest = BPromise.promisify(require('request'));

module.exports = {

  testRoute: (req, res) => {
    return res.render('test')
  }
};