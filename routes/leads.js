const express = require('express');
const {isRequestValid} = require("../routeHandlers/helpers/validator");

const router = express.Router();

const {
  getCountries, getCountryWithParameters
} = require('../sqlite/sequelize');

router.route('/countries')
  .get(async (req, res) => {
      const { startYear, endYear } = req.query;
      if (startYear && endYear) {
          const data = await getCountries({ startYear, endYear });
          res.status(200).send(data);
      } else {
          res.status(400).send({
              message: 'start or end year missing',
          });
      }
  });

router.route('/country/:id')
  .get(async (req, res) => {
    const { startYear, endYear, category } = req.query;
    const { id } = req.params;
      try {
          isRequestValid({ id, startYear, endYear, category})
          if (startYear && endYear) {
              const data = await getCountryWithParameters({ id, startYear, endYear, category });
              res.send(data);
              // res.send('hello')
          } else {
              res.send({
                  message: 'start or end date missing',
              });
          }
      } catch (e) {
      res.send({
          reason: e,
      });
    }
  });

module.exports = router;
