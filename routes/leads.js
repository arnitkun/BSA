const express = require('express');

const router = express.Router();

const {
  getCountries,
} = require('../sqlite/sequelize');

router.route('/countries')
  .get(async (req, res) => {
      const { startYear, endYear } = req.query;
      if (startYear && endYear) {
          const data = await getCountries({ startYear, endYear });
          res.status(200).send(data);
      } else {
          res.status(400).send({
              status: 'failure',
              reason: 'start or end year missing',
          });
      }
  });

router.route('/countries/:country_id')
  .get(async (req, res) => {
    const { startYear, endYear, CO2, NO2 } = req.params;
    try {
      if (startYear && endYear) {
        await updateLead({ lead_id, fields: { status: 'Contacted', communication } });
        res.status(200).send({
          status: 'success',
        });
      } else {
        res.status(404).send({
          status: 'failure',
          reason: 'No lead with the lead_id',
        });
      }
    } catch (e) {
      res.status(400).send({
        status: 'failure',
        reason: e.errors[0].message,
      });
    }
  });

module.exports = router;
