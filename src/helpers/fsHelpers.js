const fs = require('fs');
const path = require('path');
/**
 * Shortcut to path.resolve(string...)
 * @memberof module:themis/helpers
 * @inner
 * @param {...string} args - the path parts to join and resolve
 */
function resolvePath() {
  return path.resolve.apply(path, arguments);
}

/**
 * Scan a directory, returning absolute paths for all files in that path
 * @memberof module:themis/helpers
 * @inner
 * @param {string} directoryPath - the path to scan
 */
const scanDirectory = directoryPath => {
  directoryPath = path.resolve(directoryPath);
  return fs.readdirSync(directoryPath).map(fname => {
    return path.join(directoryPath, fname);
  });
};

/**
 * Require all of the JS or JSON files in a directory and return the array
 * @memberof module:themis/helpers
 * @inner
 * @param {string} directoryPath - the path to scan
 * @param {Function} [validate] - a function to ensure that the required file presents the correct API
 */
const requireAll = (directoryPath, validate) => {
  if (!validate || !(validate instanceof Function)) {
    validate = x => !!x;
  }

  return scanDirectory(directoryPath)
    .map(filename => {
      let ext = (path.extname(filename) || '').toLowerCase();
      if (ext === '.js' || ext === '.json') {
        if (Object.prototype.hasOwnProperty.call(require.resolve, filename)) {
          delete require.cache[require.resolve(filename)];
        }
        return require(filename);
      } else {
        return null;
      }
    })
    .filter(validate);
};

exports.resolvePath = resolvePath;
exports.scanDirectory = scanDirectory;
exports.requireAll = requireAll;
