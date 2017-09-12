/**
 * Get the values for an object
 * @memberof module:themis/helpers
 * @inner
 * @param {Object} obj - the source object
 * @returns {Array} - the array of values
 */
const getValues = (obj) => {
  return Object.keys(obj).map(key => obj[key]);
};

module.exports = getValues;