const { validateJsConfObj, validateConfObjForAllCountries } = require('./configChecker');

function isGetCountryByCategoryValid(reqObj) {
  const { error } = validateJsConfObj(reqObj);
  return error;
}

function validateAllCountryReq(reqObj) {
  const { error } = validateConfObjForAllCountries(reqObj);
  return error;
}

module.exports = { isGetCountryByCategoryValid, validateAllCountryReq };
