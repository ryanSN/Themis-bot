const getValues = require('./getValues');
const flatten = require('./flatten');
const getDuplicates = require('./getDuplicates');
const { resolvePath, scanDirectory, requireAll } = require('./fsHelpers');

/**
 * AN helper.
 */
const helper = () => {
};

module.exports = {
  helper,
  resolvePath,
  scanDirectory,
  requireAll,
  getValues,
  getDuplicates,
  flatten
};