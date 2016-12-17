'use strict';

const _        = require('lodash');
const numeral  = require('numeral');
const BPromise = require('bluebird');
const brequest = BPromise.promisify(require('request'));

module.exports = {

  testRoute: (req, res) => {
    return res.render('test')
  },

  getOneCharacter: (req, res) => {

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
        let data = _.attempt(JSON.parse, response.body);
        return res.render('character', data);
      })
      .catch(err => {
        return res.render('error', err)
      })
  },

  getCharacters: (req, res) => {

    let BASE_OPTIONS = {
      method: 'GET',
      uri: 'http://swapi.co/api/people',
      qs: {
        limit: 10
      }
    };

    BPromise.map(_.range(1, 6), pageNumber => {
      let options     = _.clone(BASE_OPTIONS);
      options.qs.page = pageNumber;

      return brequest(options)
        .then(response => {
          return _.attempt(JSON.parse, response.body).results;
        })
    })
      .then(_.flatten)
      .then(characters => {

        _.each(characters, character => {
          character.height = numeral(character.height)._value;
          character.mass   = numeral(character.mass)._value;
        });

        let query = req.query.sort;

        switch (query) {
          case 'name':
            return res.status(200).json(_.sortBy(characters, 'name'));
            break;
          case 'mass':
            return res.status(200).json(_.sortBy(characters, 'mass'));
            break;
          case 'height':
            return res.status(200).json(_.sortBy(characters, 'height'));
            break;
          default:
            return res.status(200).json(characters);
        }
      })
      .catch(err => {
        return res.status(500).json(err);
      })
  },


};