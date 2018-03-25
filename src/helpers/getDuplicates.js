/**
 * Search something for duplicates, and return any found duplicates as an array
 * @memberof module:themis/helpers
 * @inner
 * @param {Iterable} iterable - the iterable thing to search for duplicates
 * @param {Function} [selector] - a function to select the value to be compared, defaults to identity
 * @returns {Array}
 */
const getDuplicates = (iterable, selector) => {
  if (!selector) selector = x => x;

  let duplicates = new Map();
  for (let item of iterable) {
    let val = selector(item);
    duplicates.set(val, (duplicates.get(val) || 0) + 1);
  }

  let results = [];
  for (let [key, count] of duplicates) {
    if (count > 1) results.push(key);
  }
  return results;
};

module.exports = getDuplicates;
