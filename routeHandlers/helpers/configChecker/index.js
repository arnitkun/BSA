const Joi = require('joi');

function validateCategory(categoryString, helpers) {
  const categoryArr = categoryString.split(',');
  const allowedCategories = ['CO2', 'GHGS', 'HFCS', 'CH4', 'NF3', 'N2O', 'PFCS', 'SF6', 'FLOUROCARBONSMIX'];
  if (categoryArr.length < 1) {
    throw new Error('Atleast one category needed');
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const category of categoryArr) {
    if (allowedCategories.indexOf(category) === -1) {
      throw new Error(`${category} is not a valid category entry, please choose from one or more of these: 
       'CO2', 'GHGS', 'HFCS', 'CH4', 'NF3', 'N2O', 'PFCS', 'SF6', 'FLOUROCARBONSMIX'`);
    }
  }
}

const SCHEMA_FOR_COUNTRY_WITH_CATEGORY = Joi.object().keys({
  startYear: Joi.number().required(),
  endYear: Joi.number().required(),
  category: Joi.string().required().custom(validateCategory),
});

const SCHEMA_FOR_ALL_COUNTRIES = Joi.object().keys({
  startYear: Joi.number().required(),
  endYear: Joi.number().required(),
});

const validateJsConfObj = (obj) => {
  const { value, error: err } = SCHEMA_FOR_COUNTRY_WITH_CATEGORY.validate(obj, { abortEarly: false });
  return { value, error: err };
};

const validateConfObjForAllCountries = (obj) => {
  const { value, error: err } = SCHEMA_FOR_ALL_COUNTRIES.validate(obj, { abortEarly: false });
  return { value, error: err };
};

module.exports = {
  SCHEMA_FOR_ALL_COUNTRIES, SCHEMA_FOR_COUNTRY_WITH_CATEGORY, validateJsConfObj, validateConfObjForAllCountries,
};
