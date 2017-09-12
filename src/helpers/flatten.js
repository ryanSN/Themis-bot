/**
 * Flatten an array and return the flattened array
 * @memberof module:themis/helpers
 * @inner
 * @param {Array} arrays 
 * @returns {Array} 
 */
const flatten = (arrays) => {
  let result = [];
  if(arrays && arrays instanceof Array){
    for(let item of arrays){
      if(item instanceof Array){
        result.push(...flatten(item));
      } else {
        result.push(item);
      }
    }
  }
  return result;
};

module.exports = flatten;