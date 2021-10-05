const express = require('express');
const { isGetCountryByCategoryValid, validateAllCountryReq } = require('../routeHandlers/helpers/validator');

const router = express.Router();

const {
  getCountries, getCountryWithParameters,
} = require('../sqlite/sequelize');

router.route('/countries')
  .get(async (req, res) => {
    const { startYear, endYear } = req.query;
    try {
      const isRequestValidError = validateAllCountryReq({ startYear, endYear });
      console.log({ isRequestValidError });
      if (isRequestValidError) {
        res.send({
          message: isRequestValidError.message,
        });
      } else {
        const data = await getCountries({ startYear, endYear });
        res.send(data);
      }
    } catch (e) {
      res.send({
        message: e,
      });
    }
  });

router.route('/country/:country_id')
  .get(async (req, res) => {
    const { startYear, endYear, category } = req.query;
    // eslint-disable-next-line camelcase
    const { country_id } = req.params;

    const isRequestValidError = isGetCountryByCategoryValid({ startYear, endYear, category });
    console.log({ isRequestValidError });
    if (isRequestValidError) {
      res.send({
        message: isRequestValidError.message,
      });
    } else {
      try {
        const data = await getCountryWithParameters({
          country_id, startYear, endYear, category,
        });
        res.send(data);
      } catch (e) {
        res.send({
          reason: e,
        });
      }
    }
  });

module.exports = router;
