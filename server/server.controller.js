'use strict';

const _        = require('lodash');
const BPromise = require('bluebird');
const brequest = BPromise.promisify(require('request'));

module.exports = {

  testRoute: (req, res) => {
    return res.render('test')
  },

  getCharacter: (req, res) => {

    let name = req.params.name;
    let id;

    switch (name) {
      case 'luke':
        id = 1;
        break;
      case 'leia':
        id = 5;
        break;
      case 'han':
        id = 14;
        break;
      case 'rey':
        id = 85;
        break;
      default:
        id = null;
    }

    let selectionErr = {
      err: "Invalid character selection. Must select 'luke', 'leia', 'han', or  'rey'."
    };

    if (!id) {
      return res.render('error', selectionErr);
    }

    let options = {
      method: 'GET',
      uri: `http://swapi.co/api/people/${id}`
    };

    brequest(options)
      .then(response => {
        let data = JSON.parse(response.body);
        return res.render('character', data);
      })
      .catch(err => {
        return res.render('error', err)
      })
  }

};