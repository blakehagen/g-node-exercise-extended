'use strict';

const _        = require('lodash');
const BPromise = require('bluebird');
const brequest = BPromise.promisify(require('request'));

module.exports = {

  getBestVehicles: (req, res) => {
    let BASE_PEOPLE_OPTIONS = {
      method: 'GET',
      uri: 'http://swapi.co/api/people',
      qs: {
        limit: 10
      }
    };

    let peopleData = [];

    brequest(BASE_PEOPLE_OPTIONS)
      .then(response => {
        let initialPeopleData = _.attempt(JSON.parse, response.body);
        peopleData            = _.concat(peopleData, initialPeopleData.results);

        let pages = Math.ceil(initialPeopleData.count / 10);

        BPromise.map(_.range(2, pages + 1), pageNum => {
          let options     = _.clone(BASE_PEOPLE_OPTIONS);
          options.qs.page = pageNum;

          return brequest(options)
            .then(response => {
              return _.attempt(JSON.parse, response.body).results;
            })
        })
          .then(response => {
            peopleData = _.flatten(_.concat(peopleData, response));

            let vehicles = _.map(peopleData, people => {
              return people.vehicles;
            });

            vehicles = _.flatten(vehicles);

            let count = {};
            vehicles.forEach(v => {
              count[v] = (count[v] || 0) + 1;
            });

            let order = _.chain(count)
              .map((val, key) => {
                return {name: key, count: val}
              })
              .sortBy('count')
              .reverse()
              .keyBy('name')
              .mapValues('count')
              .value();

            BPromise.mapSeries(_.keys(order), vehicle => {
              return brequest({method: 'GET', uri: vehicle})
                .then(response => {
                  return _.attempt(JSON.parse, response.body);
                })
            })
              .then(vehicles => {

                if (vehicles.length > 10) {
                  vehicles.splice(10);
                }

                return res.status(200).json(vehicles);
              })
          })
      })
  }
};