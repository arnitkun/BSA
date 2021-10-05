const { validateJsConfObj } = require('./configChecker');

function isRequestValid(reqObj) {
  const { error } = validateJsConfObj(reqObj);
  return !error;
}

module.exports = { isRequestValid };
