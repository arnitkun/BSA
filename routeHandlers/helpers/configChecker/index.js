const Joi = require('joi');

const CONFIG_CHECKER_SCHEMA = Joi.object().keys({
  startYear: Joi.number().required(),
  endYear: Joi.number().required(),
  category: Joi.string().required().valid(
    'CO2', 'GHGS', 'HFCS', 'CH4', 'NF3', 'N2O', 'PFCS', 'SF6', 'FLOUROCARBONSMIX',
  ),
});

const validateJsConfObj = (obj) => {
  const { value, error: err } = CONFIG_CHECKER_SCHEMA.validate(obj, { abortEarly: false });
  return { value, error: err };
};

module.exports = { CONFIG_CHECKER_SCHEMA, validateJsConfObj };
