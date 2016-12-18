'use strict';

const _        = require('lodash');
const numeral  = require('numeral');
const BPromise = require('bluebird');
const brequest = BPromise.promisify(require('request'));

module.exports = {

  getHeaviestFilms: (req, res) => {

    let filmOptions = {
      method: 'GET',
      uri: 'http://swapi.co/api/films/',
    };

    brequest(filmOptions)
      .then(response => {
        let filmData = _.attempt(JSON.parse, response.body).results;

        BPromise.map(filmData, film => {
          return BPromise.map(film.characters, character => {
            return brequest({method: 'GET', uri: character})
              .then(response => {
                let characterMassString = _.attempt(JSON.parse, response.body).mass;
                let characterMass       = numeral(characterMassString)._value;
                return characterMass;
              })
          })
            .then(response => {
              film.characterMass = response;
              return film;
            })
        })
          .then(films => {

            _.each(films, film => {
              film.characterMass = _.sum(_.compact(film.characterMass));
            });

            return res.status(200).json(_.reverse(_.sortBy(films, 'characterMass')));
          })
      })
      .catch(err => {
        return res.status(500).json(err);
      })
  }

};