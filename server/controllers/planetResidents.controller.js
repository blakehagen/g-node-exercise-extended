'use strict';

const _        = require('lodash');
const BPromise = require('bluebird');
const brequest = BPromise.promisify(require('request'));

module.exports = {

  getPlanetResidents: (req, res) => {

    let BASE_PLANET_OPTIONS = {
      method: 'GET',
      uri: 'http://swapi.co/api/planets',
      qs: {
        limit: 10
      }
    };

    let planetData = [];

    brequest(BASE_PLANET_OPTIONS)
      .then(response => {
        let initialPlanetData = _.attempt(JSON.parse, response.body);
        planetData            = _.concat(planetData, initialPlanetData.results);

        let pages = Math.ceil(initialPlanetData.count / 10);

        BPromise.map(_.range(2, pages + 1), pageNum => {
          let options     = _.clone(BASE_PLANET_OPTIONS);
          options.qs.page = pageNum;

          return brequest(options)
            .then(response => {
              return _.attempt(JSON.parse, response.body).results;
            })
        })
          .then(response => {
            planetData = _.flatten(_.concat(planetData, response));

            BPromise.map(planetData, planet => {
              return BPromise.map(planet.residents, resident => {
                return brequest({method: 'GET', uri: resident})
                  .then(response => {
                    let resident = _.attempt(JSON.parse, response.body).name;
                    return resident;
                  })
              })
                .then(response => {
                  if (_.isEmpty(response)) {
                    response = 'No known residents'
                  }
                  return {[planet.name]: response}
                })
            })
              .then(response => {

                let planetResidents = {};
                _.each(response, planet => {
                  planetResidents[_.keys(planet)[0]] = _.values(planet)[0];
                });

                return res.status(200).json(planetResidents);
              })
          })
      })
      .catch(err => {
        return res.status(500).json(err);
      })
  }


};