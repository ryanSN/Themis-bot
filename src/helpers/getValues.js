/**
 * Get the values for an object
 * @param {Object} obj - the source object
 * @returns {Array} - the array of values
 */
const getValues = (obj) => {
  return Object.keys(obj).map(key => obj[key]);
};

module.exports = getValues;