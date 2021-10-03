const Joi = require('joi');

const CONFIG_CHECKER_SCHEMA = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  location_string: Joi.string().required(),
  location_type: Joi.string().valid('Country', 'City', 'Zip').required(),
  mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  status: Joi.string().valid('Created', 'Contacted'),
  communication: Joi.string(),
});

const validateJsConfObj = (obj) => {
  const { value, error: err } = CONFIG_CHECKER_SCHEMA.validate(obj, { abortEarly: false });
  return { value, error: err };
};

module.exports = { CONFIG_CHECKER_SCHEMA, validateJsConfObj };
