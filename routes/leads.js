const express = require('express');
const { isRequestValid } = require('../routeHandlers/helpers/validator');

const router = express.Router();

const {
  getCountries, getCountryWithParameters,
} = require('../sqlite/sequelize');

router.route('/countries')
  .get(async (req, res) => {
    const { startYear, endYear } = req.query;
    if (startYear && endYear && typeof startYear === 'number' && typeof endYear === 'number') {
      const data = await getCountries({ startYear, endYear });
      res.status(200).send(data);
    } else {
      res.status(400).send({
        message: 'start or end year missing or not a number',
      });
    }
  });

router.route('/country/:country_id')
  .get(async (req, res) => {
    const { startYear, endYear, category } = req.query;
    // eslint-disable-next-line camelcase
    const { country_id } = req.params;

    const isRequestValidError = isRequestValid({ startYear, endYear, category });
    console.log({ isRequestValidError });
    if (isRequestValidError) {
      res.send({
        message: isRequestValidError.message,
      });
    } else {
      try {
        if (startYear && endYear) {
          const data = await getCountryWithParameters({
            country_id, startYear, endYear, category,
          });
          res.send(data);
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
    }
  });

module.exports = router;
