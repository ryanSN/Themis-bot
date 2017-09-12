const getValues = require('./getValues');
const flatten = require('./flatten');
const getDuplicates = require('./getDuplicates');
const { resolvePath, scanDirectory, requireAll } = require('./fsHelpers');
/**
 * The helpers utilized by the bot to more easily find its scripts
 * and organize its reusable code
 * 
 * @module themis/helpers
 */

/**
 * AN helper.
 */
const helper = () => {
};

/**
 * @ignore
 */
module.exports = {
  helper,
  resolvePath,
  scanDirectory,
  requireAll,
  getValues,
  getDuplicates,
  flatten
};