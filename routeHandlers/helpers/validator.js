const { validateJsConfObj } = require('./configChecker');

function isLeadValid(leadObj) {
  const { error } = validateJsConfObj(leadObj);
  return !error;
}

module.exports = { isLeadValid };
